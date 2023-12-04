import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
import { verifyToken } from "../../../middelware/token";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  const method = req.method;
  switch (method) {
    case "PATCH":
      await verifyToken(req, res);
      await updateInvoiceItem(req, res);
      break;
    case "GET":
      await verifyToken(req, res);
      await getPermissions(req, res);
      break;
  }
}


export const getPermissions  = catchError(async(req,res) =>{
  const {code} = req.id
  const data = await executeQuery("SELECT role.name as role, permission.can_view as can_view, permission.can_view_own as can_view_own,namepermission.name as permission, permission.can_edit as can_edit, permission.can_create as can_create, permission.can_delete as can_delete From tblroles as role INNER JOIN tblrolepermissions as permission ON  permission.roleid = role.roleid INNER JOIN odoads_general_tbl.tblpermissions_bk as namepermission ON namepermission.permissionid  = permission.permissionid ", `odoads_${code}`)
  if(data){
      return res.status(200).json(data)
  }else{
      return res.status(206).json(data)
  }
})

export const updateInvoiceItem = catchError(async(req,res) =>{
  const {code} = req.id
 const {id,
  item_order,
  unit,
  rate,
  qty,
  long_description,
  description,
  taxname} = req.body

const query = "UPDATE tblitems SET description = '" + description + "', long_description = '" + long_description + "', qty = " +qty + ", rate=" + rate + ", unit = '" +unit + "', item_order = " + item_order + ", tax = (Select Max(taxrate) From odoads_general_tbl.tbltaxes WHERE name = '" +taxname + "') WHERE id = "+id+""

const itemsadded = await executeQuery(query, `odoads_${code}`)
  if (itemsadded) {
    return res.status(200).json({message: "Success"})
  }else{
    return res.status(200).json({message: "Unsuccess"})   
  }
  
})