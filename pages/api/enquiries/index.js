import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";

export default async function handler(req, res) {
  const method = req.method;
  switch (method) {
    case "POST":
      await addEnquire(req, res);
      break;
  }
}

export const addEnquire = catchError(async (req, res) => {
  const { name, email, phone, message } = req.body;
  const sql = await executeQuery(
    "INSERT into enquiry (name, email, phone, message) VALUES ('" +
      name +
      "', '" +
      email +
      "','" +
      phone +
      "','" +
      message +
      "')",
    "gohoardi_goh"
  );
  if (sql) {
    return res
      .status(200)
      .json({ success: true, message: "Thanks, we will contact you soon!" });
  }
});
