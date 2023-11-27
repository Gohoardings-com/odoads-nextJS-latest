import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
import { verifyToken } from "../../../middelware/token";

export default async function handler(req, res) {
  const method = req.method;
  switch (method) {
    case "PATCH":
      verifyToken(req, res);
      allPermissions(req, res);
      break;
    case "PUT":
      verifyToken(req, res);
      rolePermissions(req, res);
      break;
    case "GET":
      verifyToken(req, res);
      leadSources(req, res);
      break;
    case "POST":
      verifyToken(req, res);
      invoiceItems(req, res);
      break;
  }
}

export const allPermissions = catchError(async (req, res) => {
  const { id, roleName } = req.body;
  const { code } = req.id;
  const query =
    "SELECT permission.can_view,permission.can_view_own,permission.can_edit,permission.can_create,permissionname.name as permissionnameName, permissionname.shortname as short_name, permission.can_delete FROM tblstaffpermissions as permission INNER JOIN odoads_general_tbl.tblpermissions_bk as permissionname ON permissionname.permissionid = permission.permissionid WHERE permission.staffid = " +
    id +
    "";
  const data = await executeQuery(query, `odoads_${code}`);
  if (data.length == 0) {
    const value = await executeQuery(
      "SELECT permission.can_view,permission.can_view_own,permission.can_edit,permission.can_create,permissionname.name as permissionnameName, permissionname.shortname as short_name, permission.can_delete from tblrolepermissions as permission INNER JOIN  odoads_general_tbl.tblpermissions_bk as permissionname ON permissionname.permissionid = permission.permissionid WHERE permission.roleid =  (SELECT Max(roleid) From tblroles WHERE name LIKE '%" +
        roleName +
        "')",
      `odoads_app`
    );
    if (value) {
      return res.status(200).json(value);
    }
  } else {
    return res.status(200).json(data);
  }
});

export const rolePermissions = catchError(async (req, res) => {
  const { id } = req.body;
  const { code } = req.id;
  const data = await executeQuery(
    "SELECT permission.can_view,permission.can_view_own,permission.can_edit,permission.can_create,permissionname.name as permissionname, permissionname.shortname as short_name, permission.can_delete from tblrolepermissions as permission INNER JOIN  odoads_general_tbl.tblpermissions_bk as permissionname ON permissionname.permissionid = permission.permissionid WHERE permission.roleid = " +
      id +
      "",
    `odoads_${code}`
  );
  if (data.length == 0) {
    const data = await executeQuery(
      "SELECT permission.can_view,permission.can_view_own,permission.can_edit,permission.can_create,permissionname.name as permissionname, permissionname.shortname as short_name, permission.can_delete from tblrolepermissions as permission INNER JOIN  odoads_general_tbl.tblpermissions_bk as permissionname ON permissionname.permissionid = permission.permissionid WHERE permission.roleid = " +
        id +
        "",
      `odoads_app`
    );
    if (data) {
      return res.status(200).json(data);
    }
  } else {
    return res.status(200).json(data);
  }
});

export const invoiceItems = catchError(async (req, res) => {
  const { id } = req.body;
  const { code } = req.id;
  const data = await executeQuery(
    "SELECT item.id,item.item_order,item.unit,item.rate,item.qty,item.long_description,item.description,taxes.taxname  FROM tblitems as item INNER JOIN odoads_general_tbl.tblitemstax as taxes ON item.tax = taxes.id  WHERE item.rel_id = " +
      id +
      "",
    `odoads_${code}`
  );
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(200).json({ message: "Something Wrong" });
  }
});
