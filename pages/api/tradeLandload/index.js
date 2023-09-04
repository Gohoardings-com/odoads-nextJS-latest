import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
import { verifyToken } from "../../../middelware/token";

export default async function handler(req, res) {
  const method = req.method;
  switch (method) {
    case "POST":
      await verifyToken(req, res);
      await addlandlord(req, res);
      break;
    case "GET":
      await verifyToken(req, res);
      await alllandlords(req, res);
      break;
    case "PATCH":
      await verifyToken(req, res);
      await deletelandlord(req, res);
      break;
    case "PUT":
      await verifyToken(req, res);
      await updatelandlord(req, res);
      break;
  }
}

export const addlandlord = catchError(async (req, res) => {
  const code = req.id.code;
  if (code) {
    const { value } = req.body;

    const { name, email, phone, address, city, state, zip } = value;
    const result = await executeQuery(
      "INSERT into tbllandlords set firstname = '" + name +
      "',email = '" +
      email +
      "', phone  = " +
      phone +
      ", address =  '" +
      address +
      "', city_id = (SELECT id FROM odoads_general_tbl.tblcities WHERE name = '" +
      city +
      "'), state_id = (SELECT id FROM odoads_general_tbl.tblstates WHERE name = '" +
      state +
      "'), postalcode =  " +
      zip +
      ", date_added = CURRENT_TIMESTAMP, status = 1",
      `odoads_${code}`
    );
    if (result) {
      return res.status(200).json({ message: "landlord Added Successfully" });
    } else {
      return res.status(200).json({ message: "Something Wrong" });
    }
  }
});

export const alllandlords = catchError(async (req, res) => {
  const code = req.id.code;
  const data = await executeQuery(
    "SELECT client.email as email, client.firstname as name,client.id as id , client.phone as phone, client.postalcode as zip, client.address as address, city.name as city, state.name as state,  client.date_added as dateCreated, client.status as active From odoads_" +
      code +
      ".tbllandlords as client INNER JOIN tblcities as city ON client.city_id = city.id  INNER JOIN tblstates as state ON state.id = client.state_id  WHERE client.isDelete = 0",
    "odoads_general_tbl"
  );
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(206).json(data);
  }
});

export const deletelandlord = catchError(async (req, res) => {
  const code = req.id.code;
  if (code) {
    const { id } = req.body;

    const data = await executeQuery(
      "UPDATE tbllandlords SET isDelete = 1 WHERE id = " + id + "",
      `odoads_${code}`
    );
    if (data) {
      return res.status(200).json({ message: "Deleted Successfully" });
    } else {
      return res.status(200).json({ message: "Deleted Failed" });
    }
  }
});

export const updatelandlord = catchError(async (req, res) => {
  const code = req.id.code;
  if (code) {
 
    const {value} = req.body;
  
    const {id, name, email, phone, address, city, state, zip } = value;

 const query  = "SELECT id, state_id from tblcities WHERE name='" + city + "'"
    const data = await executeQuery(query, "odoads_general_tbl" );
    if (data) {

      const cityId = data[0].id;
      const stateId = data[0].state_id;
    

      const result = await executeQuery(
        "UPDATE tbllandlords SET firstname = '" +
          name +
          "', phone = " +
          phone +
          ",  city_id = " +
          cityId +
          ", postalcode = " +
          zip +
          ", state_id = " +
          stateId +
          ", address = '" +
          address +
          "', email = '" +
          email +
          "'  WHERE id = " +
          id +
          " ",
        `odoads_${code}`
      );
      if (result) {      return res.status(200).json({message:"Updated Data"});
      } else {
        return res.status(206).json({ message: "Wrong data" });
      }
    } else {
      return res.status(206).json({ message: "Wrong data" });
    }
  }
});
