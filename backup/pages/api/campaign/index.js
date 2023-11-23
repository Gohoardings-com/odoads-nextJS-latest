import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
import { verifyToken, formatDate } from "../../../middelware/token";

export default async function handler(req, res) {
  const method = req.method;
  switch (method) {
    case "POST":
      await verifyToken(req, res);
      await createCampaign(req, res);
      break;
    case "GET":
      await verifyToken(req, res);
      await viewCampaign(req, res);
      break;
    case "PATCH":
      await verifyToken(req, res);
      await deleteCampaign(req, res);
      break;
    case "PUT":
      await verifyToken(req, res);
      await updateCampaign(req, res);
      break;
  }
}

export const viewCampaign = catchError(async (req, res) => {
  const databse = req.id.code;
  if (databse) {
    const allCampaingn = await executeQuery(
      "SELECT camp.id,camp.name,camp.purchase_order,camp.project_cost,  client.company as customer,CASE WHEN camp.billing_type = 1 THEN 'FIXED RATE' END as billing_type, camp.start_date, camp.deadline,camp.progress,camp.date_finished,  status.name as status FROM tblprojects as camp INNER JOIN tblclients as client ON camp.clientid = client.userid INNER JOIN  odoads_general_tbl.tblleadsstatus as status ON camp.status = status.id ",
      `odoads_${databse}`
    );
    res.send(allCampaingn);
  }
});

export const createCampaign = catchError(async (req, res) => {
  const database = req.id.code;
  const staffId = req.id.userid;
  if (database) {
    const { value } = req.body;
    const {
      name,
      customer,
      purchase_order,
      status,
      total_price,
      start_date,
      date_finished,
    } = value;

    const startDate = formatDate(start_date);
    const deadDate = formatDate(date_finished);
    const addCampain = await executeQuery(
      "INSERT into tblprojects SET name = '" +
        name +
        "',clientid = (SELECT userid FROM tblclients WHERE company = '" +
        customer +
        "'), status = (SELECT id FROM odoads_general_tbl.tblleadsstatus  WHERE name = '" +
        status +
        "'), billing_type = 1, start_date =  '" +
        startDate +
        "', deadline = '" +
        deadDate +
        "',project_created = CURRENT_TIMESTAMP, date_finished ='" +
        deadDate +
        "', addedfrom = " +
        staffId +
        ",project_cost = " +
        total_price +
        ", purchase_order = '" +
        purchase_order +
        "'",
      `odoads_${database}`
    );
    if (addCampain) {
      return res.status(200).json({ message: "Created" });
    } else {
      return res.status(206).json({ message: "Failed" });
    }
  }
});

export const updateCampaign = catchError(async (req, res) => {
  const databse = req.id.code;
  if (databse) {
    const { value } = req.body;

    const {
      id,
      name,
      purchase_order,
      customer,
      status,
      project_cost,
      date_finished,
      start_date,
    } = value;
    const startDate = formatDate(start_date);
    const deadDate = formatDate(date_finished);
    const addCampain = await executeQuery(
      "UPDATE tblprojects SET name = '" +
        name +
        "',clientid = (SELECT userid FROM tblclients WHERE company = '" +
        customer +
        "'), status = (SELECT id FROM odoads_general_tbl.tblleadsstatus  WHERE name = '" +
        status +
        "'), deadline = '" +
        deadDate +
        "',project_created = '" +
        startDate +
        "', date_finished ='" +
        deadDate +
        "', project_cost = " +
        project_cost +
        ", purchase_order = '" +
        purchase_order +
        "' WHERE id = " +
        id +
        "",
      `odoads_${databse}`
    );
    if (addCampain) {
      return res.status(200).json({ message: "Updated" });
    } else {
      return res.status(206).json({ message: "Falied" });
    }
  }
});

export const deleteCampaign = catchError(async (req, res) => {
  const { code } = req.id;
  if (code) {
    const { id } = req.body;
    const deteteProject = await executeQuery(
      "DELETE FROM tblprojects WHERE id = " + id + "",
      `odoads_${code}`
    );
    if (deteteProject) {
      return res.status(200).json({ message: "Success" });
    } else {
      return res.status(206).json({ message: "Failed" });
    }

    // if (deteteProject) {
    //   const deteteActivity = await executeQuery(
    //     "DELETE FROM tblprojectactivity WHERE project_id = " + id + "",
    //     `odoads_${code}`
    //   );

    //   if (deteteActivity) {
    //     return res.status(200);
    //   } else {
    //     return res.status(206).json({ message: "Failed" });
    //   }
    // }
  }
});
