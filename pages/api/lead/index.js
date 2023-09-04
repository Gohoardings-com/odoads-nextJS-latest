import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
import { verifyToken } from "../../../middelware/token";

export default async function handler(req, res) {
  const method = req.method;
  switch (method) {
    case "GET":
      await verifyToken(req, res);
      await allLead(req, res);
      break;
    case "POST":
      await verifyToken(req, res);
      await createLead(req, res);
      break;
    case "PUT":
      await verifyToken(req, res);
      await statussourceassigned(req, res);
      break;
    case "PATCH":
      await countryList(req, res);
      break;
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const allLead = catchError(async (req, res) => {
  const database = req.id.code;

  const data = await executeQuery(
    "SELECT cities.name as city,state.name as state,lead.id, lead.email, lead.phonenumber, source.name as source ,leadstatus.name as status,lead.name as name, lead.company as company, lead.address as address,  lead.zip as zip,staff.firstname as assignfirst ,staff.lastname as assignlast, lead.is_public, lead.website, lead.dateadded, lead.date_converted , country.short_name as country from tblleads as lead INNER JOIN odoads_general_tbl.tblcountries as country ON lead.country = country.country_id INNER JOIN tblstaff as staff ON staff.staffid = lead.assigned INNER JOIN odoads_general_tbl.tblleadsstatus as leadstatus ON lead.status  = leadstatus.statusorder INNER JOIN odoads_general_tbl.tblleadssources as source ON source.id = lead.source INNER JOIN  odoads_general_tbl.tblstates as state ON state.id = lead.state INNER JOIN odoads_general_tbl.tblcities as cities ON cities.id = lead.city WHERE lead.leadorder = 1",
    `odoads_${database}`
  );

  if (data.length >= 1) {
    return res.status(200).json(data);
  }
});

export const statussourceassigned = catchError(async (req, res) => {
  const database = req.id.code;

  if (database) {
    const data = await executeQuery(
      "SELECT DISTINCT status.name as statusName,  staff.firstname as staffname,  staff.lastname as stafflastname,  source.name as sourcename FROM odoads_general_tbl.tblleadsstatus as status, tblstaff as staff , odoads_general_tbl.tblleadssources as source",
      `odoads_${database}`
    );

    return res.send(data);
  }
});

export const countryList = catchError(async (req, res) => {
  const data = await executeQuery(
    "SELECT iso2, short_name FROM  tblcountries",
    `odoads_general_tbl`
  );
  return res.send(data);
});

// Remove Description
export const createLead = catchError(async (req, res) => {
  const databse = req.id.code;
  const { userid } = req.id;
  if (databse) {
    const { value } = req.body;
    const {
      name,
      company,
      country,
      zip,
      city,
      state,
      address,
      assigned,
      status,
      source,
      email,
      website,
      phone,
    } = value;
    const defaultCountry = country ? country : "India";
    const query =
      "INSERT into tblleads SET name = '" +
      name +
      "',  company = '" +
      company +
      "', country = (SELECT Max(country_id) FROM odoads_general_tbl.tblcountries WHERE short_name = '" +
      defaultCountry +
      "'), zip = " +
      zip +
      ", city = (SELECT MAx(id) FROM odoads_general_tbl.tblcities WHERE name = '" +
      city +
      "'), state = (SELECT Max(id) FROM odoads_general_tbl.tblstates WHERE name = '" +
      state +
      "'), address  ='" +
      address +
      "', assigned = (SELECT staffid from odoads_" +
      databse +
      ".tblstaff WHERE firstname = '" +
      assigned +
      "'), status = ( SELECT statusorder FROM odoads_general_tbl.tblleadsstatus WHERE name = '" +
      status +
      "'), source = (SELECT id FROM odoads_general_tbl.tblleadssources WHERE name='" +
      source +
      "'), email = '" +
      email +
      "', website ='" +
      website +
      "', phonenumber = " +
      phone +
      ", is_public = 1, dateadded = CURRENT_TIMESTAMP, addedfrom =  " +
      userid +
      "";
    const result = await executeQuery(query, `odoads_${databse}`);
    if (result) {
      return res.send(result);
    } else {
      return res.status(206).json({ message: "Faild" });
    }
  } else {
    return res.status(206).json({ message: "Faild" });
  }
});
