import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
const request = require("request");
export default async function handler(req, res) {
  const method = req.method;
  switch (method) {
    case "POST":
      forgetOtp(req, res);
      break;
    case "PATCH":
      matchOtp(req, res);
      break;

    case "PUT":
      await allTaxes(req, res);
      break;
  }
}

export const forgetOtp = catchError(async (req, res) => {
  const { company, contactPhone } = req.body;

  const data = await executeQuery(
    "SELECT code From tblcompanies WHERE name = '" + company + "'",
    "odoads_tblcompanies"
  );
  if (data.length == 1) {
    const companycode = data[0].code;
    const phoneNymber = await executeQuery(
      "SELECT staffid From tblstaff WHERE phonenumber = " + contactPhone + "",
      `odoads_${companycode}`
    );

    if (phoneNymber.length == 1) {
      let otp = Math.floor(100000 + Math.random() * 900000);

      request(
        {
          url: "https://api.msg91.com/api/sendhttp.php",
          method: "POST",
          form: {
            authkey: "280862A8xB5Zeo9OK45d020be9",
            mobiles: contactPhone,
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
              "Update tblstaff SET new_pass_key = " +
                otp +
                ", new_pass_key_requested = CURRENT_TIMESTAMP   WHERE phonenumber = " +
                contactPhone +
                "",
              `odoads_${companycode}`
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
      return res.status(206).json({ message: "Wrong Number" });
    }
  } else {
    return res.status(206).json({ message: "Compnay Not Registered" });
  }
});

export const matchOtp = catchError(async (req, res) => {
  const { company, contactOTP } = req.body;

  const data = await executeQuery(
    "SELECT code From tblcompanies WHERE name = '" + company + "'",
    "odoads_tblcompanies"
  );
  if (data.length == 1) {
    const companycode = data[0].code;
    const phoneNymber = await executeQuery(
      "SELECT staffid From tblstaff WHERE new_pass_key = " + contactOTP + "",
      `odoads_${companycode}`
    );
    if (phoneNymber.length == 1) {
      return res
        .status(200)
        .json({ success: true, message: "Your can countinue" });
    } else {
      return res.status(206).json({ message: "Otp not matched" });
    }
  }
});

export const allTaxes = catchError(async (req, res) => {
  const taxes = await executeQuery(
    "SELECT taxname FROM tblitemstax",
    "odoads_general_tbl"
  );
  return res.status(200).json(taxes);
});
