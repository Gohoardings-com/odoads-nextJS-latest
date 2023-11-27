import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
import bcryptjs from "bcryptjs";
import { mysql_real_escape_string, token, verifyToken } from "../../../middelware/token";
import cookie from 'cookie'
const request = require("request");
export default async function handler(req, res) {
  const method = req.method; switch (method) {
    case "POST": registerComapny(req, res); break;
    case 'GET': await addUser(req, res); break;
    case "PATCH": phoneOTp(req, res); break;
    case "PUT": verifyOtp(req, res); break;
  }
}
export const phoneOTp = catchError(async (req, res) => {
  const { phone } = req.body;
  const data = await executeQuery(
    "SELECT id FROM tblcompanies WHERE contact_phone = " + phone + " && code IS NOT NULL",
    "odoads_tblcompanies"
  );
  await executeQuery("DELETE  FROM tblcompanies WHERE contact_phone = " + phone + "", "odoads_tblcompanies")
  if (data.length == 0) {
    let otp = Math.floor(100000 + Math.random() * 900000);

    request(
      {
        url: "https://api.msg91.com/api/sendhttp.php",
        method: "POST",
        form: {
          authkey: "280862A8xB5Zeo9OK45d020be9",
          mobiles: phone,
          message: `${otp} is your one-time OTP for login into the Gohoardings account.`,
          sender: "GOHOOH",
          route: "4",
          DLT_TE_ID: "1307165770131175060",
        },
      },
      async function (error, response, body) {
        if (error) {
          res.status(400).json({ message: error.message });
        } else {
          const sql = await executeQuery(
            "INSERT into tblcompanies (contact_phone, contact_otp) VALUES  ( " +
              phone +
              "," +
              otp +
              " )",
            "odoads_tblcompanies"
          );
          if (sql) {
            return res
              .status(200)
              .json({ success: true, message: "Mobile OTP Send" });
          }
        }
      }
    );
  } else {
    return res.status(206).json({ message: "This number already exists" });
  }
});
export const verifyOtp = catchError(async (req, res) => {
  const { otp } = req.body;
  const data = await executeQuery("SELECT id FROM tblcompanies WHERE contact_otp = " + otp + " && code is null", "odoads_tblcompanies"); 
  if (data.length != 0) { 
    return res.status(200).json({ message: "Your can countinue" });
   } else { 
    return res.status(206).json({ message: "Wrong OTP" }); 
  }
});
export const registerComapny = catchError(async (req, res) => {
  const { value } = req.body  
  const { gstin, company_name, contact_email, contact_phone, contact_password } = value; 
  const promises = []
  const code = mysql_real_escape_string(company_name)  
  const name = company_name.split(" ")[0]  
  const newName = mysql_real_escape_string(name)  
  promises.push(new Promise(async (resolve, reject) => {
    const already = await executeQuery("SELECT id FROM tblcompanies WHERE code = '" + code + "' || contact_email = '" + contact_email + "'", "odoads_tblcompanies")    
    resolve(resolve)    
    if (already.length == 0) {
      const newpassword = bcryptjs.hashSync(String(contact_password), 8); //, , 1, CURRENT_TIMESTAMP, true, self                                                                                                                                            

            const sql = await executeQuery("UPDATE tblcompanies SET name = '" + company_name +"', code = '" + code + "', contact_email = '" +          contact_email +          "', contact_firstname = '" +          newName +          "', contact_password = '" +          newpassword +          "',contact_gstin = '" +          gstin +          "',  status = 1, created = CURRENT_TIMESTAMP, register = true, add_by = 'self' WHERE contact_phone = '" +          contact_phone +          "'",        "odoads_tblcompanies"      );      
            resolve(sql)      
            if (sql) {        
              const createDtabase = await executeQuery(`CREATE DATABASE odoads_${code}`);        
              if (createDtabase) {          
                const data = await executeQuery("SHOW TABLES", "odoads_app");          
                resolve(data)          
                if (data) {            
                  data.forEach(async (table) => {              
                    const createTableQuery = `CREATE TABLE IF NOT EXISTS odoads_${code}.${table.Tables_in_odoads_app} LIKE odoads_app.${table.Tables_in_odoads_app}`;              
                    const insertDataQuery = `INSERT INTO odoads_${code}.${table.Tables_in_odoads_app} SELECT * FROM odoads_app.${table.Tables_in_odoads_app}`;              
                    const value = await executeQuery(createTableQuery, `odoads_${code}`);             
                     resolve(value)             
                      if (value) {                
                        await executeQuery(insertDataQuery, `odoads_${code}`);             
                       }            
                      });         
                      return res.status(200).json({message : "Register Success"})          
                    }        
                  } else {
                    return res.status(206).json({ message: "DataBase not Created" });        
                  }       
                } else { 
                  return res.status(206).json({ message: "No User Found" });      
                }      
              }else{      
                return res.status(206).json({ message: "Company Already Registered" });     
              }
    }))
});
export const addUser = catchError(async (req, res) => {
  const userData = await executeQuery("SELECT code,contact_email, name, contact_password, contact_phone FROM tblcompanies WHERE id = (SELECT Max(id) FROM tblcompanies)", "odoads_tblcompanies")
  if (userData) {
    const code = userData[0].code
    const img_url = "https://odoads.com/imgs/man.png";
    const data = await executeQuery("INSERT into tblstaff SET email = '" + userData[0].contact_email + "', firstname = '" + userData[0].name + "', phonenumber = " + userData[0].contact_phone + ", password ='" + userData[0].contact_password + "', role=3 , profile_image = '"+img_url+"', datecreated = CURRENT_TIMESTAMP", `odoads_${code}`)
    if (data) { const getStaff = await executeQuery("SELECT staffid from tblstaff WHERE staffid = (SELECT Max(staffid) FROM tblstaff)", `odoads_${code}`) 
    if (getStaff) { const id = `${getStaff[0].staffid}&${code}`   
    res.setHeader("Set-Cookie", cookie.serialize(String(`odoads_goh`), { expires: Date.now() }))  
    token(id, 200, res); } else { return res.status(200).json({ message: "Something wrong" }) } } else {
      return res.status(200).json({ message: "Something wrong" })
    }
  } else {
    return res.status(200).json({ message: "Something wrong" })
  }

})
