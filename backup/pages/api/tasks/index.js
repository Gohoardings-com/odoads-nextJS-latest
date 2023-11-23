import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
import { formatDate, verifyToken } from "../../../middelware/token";

export default async function handler(req, res, next) {
  const method = req.method;
  switch (method) {
    case "PATCH":
      await verifyToken(req, res, next);
      await updateTasks(req, res);
      break;
    case "PUT":
      await verifyToken(req, res, next);
      await createTask(req, res);
      break;
    case "GET":
      await verifyToken(req, res, next);
      await getAllTasks(req, res);
      break;
    case "POST":
      await verifyToken(req, res, next);
      await deleteTask(req, res);
      break;
  }
}

// export const getAllTasks = catchError(async (req, res) => {
//   const databse = req.id.code;
//   let assignid = [];
//   var data = [];
//   if (databse) {
//     const sql =
//       "SELECT tasks.name, tasks.id, tasks.description,tasks.duedate, tasks.dateadded, tasks.startdate, tasks.duedate,  tasks.recurring_type, tasks.repeat_every, tasks.cycles, tasks.is_public,trt.value as related_type,trt.databse as red_id_data,trt.name as red_id_name, tasks.rel_id as rel_id ,priorities.name as priorities, stat.name as status FROM tblstafftasks as tasks INNER JOIN odoads_general_tbl.tblpriorities as priorities  ON priorities.priorityid  = tasks.priority INNER JOIN odoads_general_tbl.tblleadsstatus as stat ON stat.id = tasks.status INNER JOIN odoads_general_tbl.task_related_table as trt ON tasks.rel_type = trt.id WHERE tasks.visible_to_client = 0";
//     const allData = await executeQuery(sql, `odoads_${databse}`);

//     if (allData) {
//        // Create an object to store the assign values for each element in allData
//        const assignData = {};
//       allData.map(async (el) => {
//         console.log("red_id_name",el.red_id_name,"red_id_data",el.red_id_data,"rel_id",el.rel_id);
//         switch (el.red_id_name) {
//           case "invoices":
//             assignid = await executeQuery(
//               "SELECT  firstname as name FROM " +
//                 el.red_id_data +
//                 " WHERE staffid = " +
//                 el.rel_id +
//                 "",
//               `odoads_${databse}`
//             );
//             break;
//           case "customers":
//             assignid = await executeQuery(
//               "SELECT  company as name FROM " +
//                 el.red_id_data +
//                 " WHERE userid = " +
//                 el.rel_id +
//                 "",
//               `odoads_${databse}`
//             );
//             break;
//           case "lead":
//             assignid = await executeQuery(
//               "SELECT  name as name  FROM " +
//                 el.red_id_data +
//                 " WHERE id = " +
//                 el.rel_id +
//                 "",
//               `odoads_${databse}`
//             );
//             break;
//           case "campaign":
//             assignid = await executeQuery(
//               "SELECT  name  as name FROM " +
//                 el.red_id_data +
//                 " WHERE id = " +
//                 el.rel_id +
//                 "",
//               `odoads_${databse}`
//             );
//             break;
//           case "clientWorkship":
//             assignid = await executeQuery(
//               "SELECT  firstname as name FROM " +
//                 el.red_id_data +
//                 " WHERE userid = " +
//                 el.rel_id +
//                 "",
//               `odoads_${databse}`
//             );
//             break;
//           case "tradeLandload":
//             assignid = await executeQuery(
//               "SELECT firstname  as name  FROM " +
//                 el.red_id_data +
//                 " WHERE id = " +
//                 el.rel_id +
//                 "",
//               `odoads_${databse}`
//             );
//             break;
//           default:
//             "Please select any related_to";
//             break;
//         }
//         data.push({ name: assignid[0].name });
//       });
//     }

//     setTimeout(() => {
//       allData.forEach((el) => {
//         for (let i = 0; i < data.length; i++) {
//           el["assign"] = data[i].name;
//         }
//       });

//       return res.status(200).json(allData);
//     }, 10);
//   }
// });

export const getAllTasks = catchError(async (req, res) => {
  const databse = req.id.code;
  let assignid = [];
  if (databse) {
    const sql =
      "SELECT tasks.name, tasks.id, tasks.description, tasks.duedate, tasks.dateadded, tasks.startdate, tasks.duedate, tasks.recurring_type, tasks.repeat_every, tasks.cycles, tasks.is_public, trt.value as related_type, trt.databse as red_id_data, trt.name as red_id_name, tasks.rel_id as rel_id ,priorities.name as priorities, stat.name as status FROM tblstafftasks as tasks INNER JOIN odoads_general_tbl.tblpriorities as priorities ON priorities.priorityid = tasks.priority INNER JOIN odoads_general_tbl.tblleadsstatus as stat ON stat.id = tasks.status INNER JOIN odoads_general_tbl.task_related_table as trt ON tasks.rel_type = trt.id WHERE tasks.visible_to_client = 0";

    const allData = await executeQuery(sql, `odoads_${databse}`);
    if (allData) {

      const assignData = {};
      await Promise.all(
        allData.map(async (el) => {
          switch (el.red_id_name) {
            case "invoices":
              assignid = await executeQuery(
                "SELECT number as name FROM " +
                  el.red_id_data +
                  " WHERE id = " +
                  el.rel_id +
                  "",
                `odoads_${databse}`
              );
              break;
            case "customers":
              assignid = await executeQuery(
                "SELECT  company as name FROM " +
                  el.red_id_data +
                  " WHERE userid = " +
                  el.rel_id +
                  "",
                `odoads_${databse}`
              );
              break;
            case "lead":
              assignid = await executeQuery(
                "SELECT  name as name  FROM " +
                  el.red_id_data +
                  " WHERE id = " +
                  el.rel_id +
                  "",
                `odoads_${databse}`
              );
              break;
            case "campaign":
              assignid = await executeQuery(
                "SELECT  name  as name FROM " +
                  el.red_id_data +
                  " WHERE id = " +
                  el.rel_id +
                  "",
                `odoads_${databse}`
              );
              break;
            case "clientWorkship":
              assignid = await executeQuery(
                "SELECT  firstname as name FROM " +
                  el.red_id_data +
                  " WHERE userid = " +
                  el.rel_id +
                  "",
                `odoads_${databse}`
              );
              break;
            case "tradeLandload":
              assignid = await executeQuery(
                "SELECT firstname  as name  FROM " +
                  el.red_id_data +
                  " WHERE id = " +
                  el.rel_id +
                  "",
                `odoads_${databse}`
              );
              break;
            default:
              break;
          }

          if (assignid.length > 0) {
            assignData[el.id] = assignid[0].name;
          }
        })
      );

      allData.forEach((el) => {
        el["assign"] = assignData[el.id] || "Please select any related_to";
      });

      return res.status(200).json(allData);
    }
  }
});

export const createTask = catchError(async (req, res) => {
  const databse = req.id.code;
  const staffId = req.id.userid;
  const { posts } = req.body;
  const {
    subject,
    start_date,
    Due_date,
    Priority,
    related_to,
    task_Description,
    assign,
    status,
  } = posts;
  let assignid;
  const Repeat_value = "month";
  switch (related_to) {
    case "invoices":
      assignid = await executeQuery(
        "SELECT id as id FROM tblinvoices WHERE number = '" + assign + "'",
        `odoads_${databse}`
      );
      break;
    case "customers":
      assignid = await executeQuery(
        "SELECT userid as id FROM tblclients WHERE company = '" + assign + "'",
        `odoads_${databse}`
      );
      break;
    case "lead":
      assignid = await executeQuery(
        "SELECT id FROM tblleads WHERE name = '" + assign + "'",
        `odoads_${databse}`
      );
      break;
    case "campaign":
      assignid = await executeQuery(
        "SELECT id FROM tblprojects WHERE name = '" + assign + "'",
        `odoads_${databse}`
      );
      break;
    case "clientWorkship":
      assignid = await executeQuery(
        "SELECT userid as id FROM tblcontacts WHERE firstname = '" +
          assign +
          "'",
        `odoads_${databse}`
      );
      break;
    case "tradeLandload":
      assignid = await executeQuery(
        "SELECT id FROM tbllandlords WHERE firstname = '" + assign + "'",
        `odoads_${databse}`
      );
      break;
    default:
      "Please select any related_to";
      break;
  }

  const relatedUserid = assignid[0].id;
  if (databse) {
    const startDate = formatDate(start_date);
    const endDate = formatDate(Due_date);
    const addTasks = await executeQuery(
      "INSERT INTO tblstafftasks SET name = '" +
        subject +
        "', description = '" +
        task_Description +
        "', priority = (SELECT priorityid FROM  odoads_general_tbl.tblpriorities WHERE name = '" +
        Priority +
        "'), dateadded = CURRENT_TIMESTAMP, startdate = '" +
        startDate +
        "', duedate = '" +
        endDate +
        "',  addedfrom =  " +
        staffId +
        ", recurring_type = '" +
        Repeat_value +
        "', repeat_every = 12, rel_type = (SELECT id FROM odoads_general_tbl.task_related_table WHERE name = '" +
        related_to +
        "'), rel_id = " +
        relatedUserid +
        ", status =  (SELECT id FROM odoads_general_tbl.tblleadsstatus  WHERE name = '" +
        status +
        "')",
      `odoads_${databse}`
    );
    if (addTasks) {
      return res.status(200).json({ message: "Success" });
    }
  }
});

export const updateTasks = catchError(async (req, res) => {
  const databse = req.id.code;
  const { value } = req.body;
  const {
    id,
    name,
    startdate,
    duedate,
    priorities,
    Repeat_value,
    red_id_name,
    description,
    assign,
    status,
  } = value;

  let assignid;

  switch (red_id_name) {
    case "invoices":
      assignid = await executeQuery(
        "SELECT id as id FROM tblinvoices WHERE number = '" + assign + "'",
        `odoads_${databse}`
      );
      break;
    case "customers":
      assignid = await executeQuery(
        "SELECT userid as id FROM tblclients WHERE company = '" + assign + "'",
        `odoads_${databse}`
      );
      break;
    case "lead":
      assignid = await executeQuery(
        "SELECT id FROM tblleads WHERE name = '" + assign + "'",
        `odoads_${databse}`
      );
      break;
    case "campaign":
      assignid = await executeQuery(
        "SELECT id FROM tblprojects WHERE name = '" + assign + "'",
        `odoads_${databse}`
      );
      break;
    case "clientWorkship":
      assignid = await executeQuery(
        "SELECT userid as id FROM tblcontacts WHERE firstname = '" +
          assign +
          "'",
        `odoads_${databse}`
      );
      break;
    case "tradeLandload":
      assignid = await executeQuery(
        "SELECT id FROM tbllandlords WHERE firstname = '" + assign + "'",
        `odoads_${databse}`
      );
      break;
    default:
      "Please select any related_to";
      break;
  }

  const relatedUserid = assignid[0].id;
  if (databse) {
    const startDate = formatDate(startdate);
    const endDate = formatDate(duedate); // name,         description,            priority,        dateadded,      startdate,    duedate,     datefinished, addedfrom,    recurring_type, repeat_every, cycles, is_public, rel_type, rel_id, visible_to_client
    const query =
      "UPDATE tblstafftasks SET name= '" +
      name +
      "', description = '" +
      description +
      "', priority = (SELECT priorityid FROM  odoads_general_tbl.tblpriorities WHERE name = '" +
      priorities +
      "'), startdate = '" +
      startDate +
      "', duedate = '" +
      endDate +
      "', recurring_type = '" +
      Repeat_value +
      "', repeat_every = 6,  rel_type = (SELECT id FROM odoads_general_tbl.task_related_table WHERE name = '" +
      red_id_name +
      "'), rel_id = " +
      relatedUserid +
      ", status = (SELECT statusorder FROM odoads_general_tbl.tblleadsstatus WHERE name = '" +
      status +
      "') WHERE id = " +
      id +
      "";

    const addTasks = await executeQuery(query, `odoads_${databse}`);
    if (addTasks) {
      return res.status(200).json({ message: "Success" });
    } else {
      return res.status(206).json("Problem");
    }
  }
});

export const deleteTask = catchError(async (req, res) => {
  const code = req.id.code;
  if (code) {
    const { id } = req.body;
    const allData = await executeQuery(
      "UPDATE tblstafftasks SET visible_to_client  = 1 WHERE id = " + id + "",
      `odoads_${code}`
    );
    if (allData) {
      return res.status(200).json({ message: "Delete Successfully" });
    } else {
      return res.status(206).json({ message: "Failed" });
    }
  }
});
