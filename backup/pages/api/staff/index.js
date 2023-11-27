import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
import { verifyToken } from "../../../middelware/token";
import bcrypt from "bcryptjs";
const jwtToken = require('jsonwebtoken')
const cookie = require('cookie')



export default async function handler(req, res) {
  const method = req.method;
  switch (method) {
    case "PATCH":
      await verifyToken(req, res);
      await deleteStaff(req, res);
      break;
    case "PUT":
      await verifyToken(req, res);
      await updateSatff(req, res);
      break;
    case "GET":
      await verifyToken(req, res);
      await showStaff(req, res);
      break;
    case "POST":
      await verifyToken(req, res);
      await addStaff(req, res);
      break;
  }
}


export const showStaff = catchError(async (req, res) => {
  const dataBase = req.id.code;
  const satffMembers = await executeQuery(
    "SELECT staff.staffid,staff.phonenumber,staff.datecreated,staff.firstname,staff.facebook,staff.profile_image, staff.linkedin, staff.skype ,staff.lastname, staff.email, role.name as role from tblstaff as staff INNER JOIN tblroles as role ON role.roleid = staff.role WHERE staff.active = 1",
    `odoads_${dataBase}`
  );
  if (satffMembers) {
    return res.status(200).json(satffMembers);
  } else {
    return res.status(206).json({ message: "Something Wrong" });
  }
});

export const addStaff = catchError(async (req, res) => {
  const { code } = req.id
  const { value } = req.body;
  const promises = []
  const { email,
    role_name,
    name,
    password,
    facebook,
    linkdin,
    skype,
    phone_number, all_Permission
  } = value;

  const newPassword = bcrypt.hashSync(password, 8); 
  const addStaff = await executeQuery(
    "INSERT into tblstaff SET email = '" +
    email +
    "', firstname =  '" +
    name +
    "', facebook = '" +
    facebook +
    "', linkedin = '" +
    linkdin +
    "', phonenumber = " +
    phone_number +
    ", skype =  '" +
    skype +
    "', password = '" +
    newPassword +
    "', datecreated = CURRENT_TIMESTAMP,  role = " + role_name + "",
    `odoads_${code}`
  );
  if (addStaff) {
    all_Permission.map(async (el) => {
      promises.push(new Promise(async (resolve, reject) => {
        const addPermissions = await executeQuery("INSERT into tblstaffpermissions SET staffid  = (SELECT Max(staffid) from tblstaff WHERE  role = " + role_name + "), can_view = " + el.view + ", can_view_own = " + el.view_own + ", can_edit = " + el.edit + ", can_create = " + el.create + ", can_delete = " + el.delete + ", permissionid = (SELECT permissionid from odoads_general_tbl.tblpermissions_bk WHERE shortname = '" + el.short_name + "')", `odoads_${code}`)
        if (addPermissions) {
          resolve(addPermissions)
        } else {
          reject(addPermissions)
        }
      }))
    })
  } else {
    return res.status(206).json({ message: "Something Wrong" });
  }
  try {
    const data = await Promise.all(promises);
    if (data) {
      return res.status(200).json({ message: "Satff Member added Successfully" });

    }

  } catch (err) {
    return res.send(err)
  }

});

export const deleteStaff = catchError(async (req, res) => {
  const { id } = req.body;
  const dataBase = req.id.code;;
  const satffMembers = await executeQuery(
    "UPDATE tblstaff SET active = 0 WHERE staffid = " + id + "",
    `odoads_${dataBase}`
  );
  if (satffMembers) {
    return res
      .status(200)
      .json({ message: "StaffMember Removed Successfully" });
  } else {
    return res.status(206).json({ message: "Something Wrong" });
  }
});

export const updateSatff = catchError(async (req, res) => {
  const { code } = req.id
  const { value, permission } = req.body;
  const promises = []
  const { email, staffid,
    role,
    firstname,
    password,
    facebook,
    linkdin,
    skype,
    lastname,
    phonenumber
  } = value;
  const newPassword = bcrypt.hashSync(String(password), 8); //    email,     firstname, lastname,       facebook,    linkedin,      phonenumber, skype, password, datecreated, admin, email_signature
  const addStaff = await executeQuery(
    "Update tblstaff SET email = '" +
    email +
    "', lastname =  '" +
    lastname +
    "', firstname =  '" +
    firstname +
    "', facebook = '" +
    facebook +
    "', linkedin = '" +
    linkdin +
    "', phonenumber = " +
    phonenumber +
    ", skype =  '" +
    skype +
    "', password = '" +
    newPassword +
    "', datecreated = CURRENT_TIMESTAMP,  role = (SELECT Max(roleid) From tblroles WHERE name LIKE '%" + role + "') WHERE staffid = " + staffid + "",
    `odoads_${code}`
  );
  if (addStaff) {
    const data = await executeQuery("SELECT can_view  FROM tblstaffpermissions  WHERE staffid = " + staffid + " LIMIT 1", `odoads_${code}`)
    promises.push(new Promise(async (resolve, reject) => {
      if (data.length == 0) {
        permission.map(async (el) => {
          const addPermissions = await executeQuery("INSERT into tblstaffpermissions SET can_view = " + el.can_view + ", can_view_own = " + el.can_view_own + ", can_edit = " + el.can_edit + ", can_create = " + el.can_create + ", can_delete = " + el.can_delete + ", staffid = " + staffid + " , permissionid = (SELECT permissionid from odoads_general_tbl.tblpermissions_bk WHERE shortname = '" + el.short_name + "')", `odoads_${code}`)
          if (addPermissions) {
            resolve(addPermissions)
          } else {
            reject(addPermissions)
          }
        })
      } else {
        permission.map(async (el) => {
          const addPermissions = await executeQuery("Update tblstaffpermissions SET can_view = " + el.can_view + ", can_view_own = " + el.can_view_own + ", can_edit = " + el.can_edit + ", can_create = " + el.can_create + ", can_delete = " + el.can_delete + " WHERE staffid = " + staffid + " && permissionid = (SELECT permissionid from odoads_general_tbl.tblpermissions_bk WHERE shortname = '" + el.short_name + "')", `odoads_${code}`)
          if (addPermissions) {
            resolve(addPermissions)
          } else {
            reject(addPermissions)
          }
        })
      }
    }))
  } else {
    return res.status(206).json({ message: "Something Wrong" });
  }
  try {
    const data = await Promise.all(promises);
    if (data) {
      return res.status(200).json({ message: "Satff Member added Successfully" });

    }

  } catch (err) {
    return res.send(err)
  }
});



export const addImages = catchError(async (req, res) => {
  const cookieData = req.cookies;

  if (!cookieData) {
    return res.status(400).json({ message: "No Cookie Found" })
  }
  const token = Object.values(cookieData)[0];
  if (!token) {
    return res.status(206).json({ message: "No Token Found" })
  } else {
    return jwtToken.verify(token, "thisismysecretejsonWebToken", async (err, user) => {
      if (err) {
        return res.status(206).json({ message: "InValid Token" });
      } else {
        const data = user.id
        const getid = data.split('&')
        if (getid) {
          let data = [];
          const comapny = getid[1]
          if (req.file) {
            const { filename } = req.file
            if (filename) {
              const { name, staffid } = req.body


              // const image = `http://${req.headers.host}/upload/${filename}`
              const image = `http://localhost:3001/upload/${filename}`

              let query;
              if (staffid) {
                if (name == "media") {
                  query = "Where id = " + staffid + ""
                } else if (name == "staff") {
                  query = "Where staffid = " + staffid + ""
                }
              } else {
                if (name == "media") {
                  query = "WHERE id = (SELECT Max(id) FROM tblmedia_deails)"
                } else if (name == "staff") {
                  query = " WHERE staffid = (SELECT Max(staffid) FROM tblstaff)"
                }
              }

              switch (name) {
                case "media": data = await executeQuery("Update tblmedia_deails SET thumbnail = '" + image + "' " + query + "", `odoads_${comapny}`)
                  break;
                case "staff": data = await executeQuery("Update tblstaff SET profile_image = '" + image + "' " + query + "", `odoads_${comapny}`)
                  break;
                case "self":
                  break;
              }
              if (data) {
                return res.status(200).json({ message: "Success" })
              }
            } 
          }
          else{
            return res.status(206).json({message : "File not found"})
          }

        }
      }
    })
  }

})