import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
import cookie from "cookie";
import bcrypt from "bcryptjs";
import { token, verifyToken } from "../../../middelware/token";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "POST":
      changePassword(req, res);
      break;
    case "PUT":
      await verifyToken(req, res);
      await logOut(req, res);
      break;
    case "PATCH":
      await loginEmail(req, res);
      break;
    case "GET":
      await verifyToken(req, res);
      await getUser(req, res);
      break;
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const loginEmail = catchError(async (req, res) => {
  const { formData } = req.body;
  const { email, password, company } = formData;
  const data = await executeQuery(
    "SELECT code, Plan, Plan_type, paid FROM tblcompanies WHERE name = '" + company + "' ",
    "odoads_tblcompanies"
  );

  if (data.length == 1) {
    if (data[0].paid == 0) {
      return res.status(206).json({ success: false, message: "Select Plan" });
    }
    const userid = data[0].code;
    const stafflogin = await executeQuery(
      "SELECT password, staffid From tblstaff WHERE email = '" + email + "'",
      `odoads_${userid}`
    );
    if (stafflogin.length == 1) {
      const datapas = stafflogin[0].password;
      const matchPassword = bcrypt.compareSync(password, datapas);
      if (matchPassword) {
        const id = `${stafflogin[0].staffid}&${userid}`;
        res.setHeader(
          "Set-Cookie",
          cookie.serialize(String(`odoads_goh`), { expires: Date.now() })
        );
        token(id, 200, res);
      } else {
        return res.status(206).json({ message: "Password Not matched" });
      }
    } else {
      return res
        .status(206)
        .json({ success: false, message: "Email Not Found" });
    }
  } else {
    return res
      .status(206)
      .json({ success: false, message: "Company Not Registered" });
  }
});

export const getUser = catchError(async (req, res, next) => {
  const { code, userid } = req.id;

  const query = `
    SELECT 
      staffid as id, 
      firstname,
      facebook,
      linkedin,
      phonenumber,
      skype,
      profile_image,
      name
    FROM tblstaff 
    JOIN tblroles ON role = roleid
    WHERE staffid = ${userid}
  `;

  const data = await executeQuery(query, `odoads_${code}`);

  if (data.length === 1) {
    return res.status(200).json(data); // Return the first item as we expect only one result
  } else {
    return res.status(206).json("Try again");
  }

 
});


export const changePassword = catchError(async (req, res) => {
  const { contactPhone, password, confirmPassword, company } = req.body;
  if (
    password !== undefined &&
    confirmPassword !== undefined &&
    company !== undefined
  ) {
    if (password === confirmPassword) {
      const finalPassword = bcrypt.hashSync(String(password), 8);
      if (!finalPassword) {
        return res
          .status(206)
          .json({ success: false, message: "Password Error" });
      } else {
        const sql = await executeQuery(
          "SELECT code from  tblcompanies WHERE  name='" + company + "'",
          "odoads_tblcompanies"
        );
        if (sql) {
          const Companycode = sql[0].code;
          const updatePassword = await executeQuery(
            "Update tblstaff SET password = '" +
              finalPassword +
              "', last_password_change = CURRENT_TIMESTAMP WHERE phonenumber = " +
              contactPhone +
              "",
            `odoads_${Companycode}`
          );
          if (updatePassword) {
            const staffid = await executeQuery(
              "SELECT staffid FROM tblstaff  WHERE phonenumber = " +
                contactPhone +
                "",
              `odoads_${Companycode}`
            );
            const logindata = `${staffid[0].staffid}&${Companycode}`;
            res.setHeader(
              "Set-Cookie",
              cookie.serialize(String(`odoads_goh`), { expires: Date.now() })
            );
            token(logindata, 200, res);
          }
        }
      }
    } else {
      return res
        .status(206)
        .json({ success: false, message: "Your Password Not Matched" });
    }
  } else {
    return res.status(206).json({ success: false, message: "Empty Field" });
  }
});

export const logOut = catchError(async (req, res, next) => {
  const { code, userid } = req.id;
  const { id } = req.body;

  if (userid == id) {
    const updateDatabse = await executeQuery(
      "Update tblstaff SET last_activity = CURRENT_TIMESTAMP, last_login = CURRENT_TIMESTAMP WHERE staffid = " +
        id +
        " ",
      `odoads_${code}`
    );
    if (updateDatabse) {
      const option = {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        httpOnly: false,
        sameSite: "strict",
      };

      const logoutData = `${userid}&${code}`;
      return res
        .status(200)
        .setHeader(
          "Set-Cookie",
          cookie.serialize(
            String(logoutData),
            "thisismysecretejsonWebToken",
            option
          )
        )
        .json({
          success: true,
          message: "User Logout SuccessFully",
        });
    } else {
      return res.status(206).json({ message: "User Not Found" });
    }
  } else {
    return res.status(206).json({ message: "User Not Found" });
  }
});
