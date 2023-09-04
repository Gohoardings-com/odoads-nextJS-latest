import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
import { verifyToken } from "../../../middelware/token";

export default async function handler(req, res){
    const method = req.method
     switch(method){
         case 'POST': await verifyToken(req,res);await addrole(req,res)
         break;
         case 'GET':await verifyToken(req,res);await allrole(req,res)
         break;
         case 'PATCH':await verifyToken(req,res);await deleterole(req,res)
         break;
         case 'PUT':await verifyToken(req,res);await updaterole(req,res)
         break;     
      }
 }
 
 export const addrole = catchError(async(req,res) =>{
    const {code} = req.id
    const {value } = req.body     
    const {name, all_Permission}  = value      
    const promisies = []

 const result = await executeQuery("INSERT into tblroles (name) VALUES ('"+name+"')", `odoads_${code}`)
if(result){

    all_Permission.forEach(async(el) =>{
        promisies.push(new Promise(async(resolve,reject) =>{
              
             const result = await executeQuery("INSERT into tblrolepermissions SET permissionid = (SELECT permissionid from odoads_general_tbl.tblpermissions_bk WHERE shortname = '"+el.short_name+"'), can_view = "+el.view+", can_view_own =  "+el.view_own+",  can_edit =  "+el.edit+", can_create =  "+el.create+",can_delete =  "+el.delete+", roleid =(SELECT Max(roleid) from  tblroles WHERE name = '"+name+"') ", `odoads_${code}`)
             if(result){
                 resolve(result)
             }else{
            reject(result)
             }
     
      
       }))
   })
   try{
    const data = await Promise.all(promisies)
      if(data){

        return res.status(200).json({message : "Role Permission set"})
      }
   }catch(err){
    return res.status(500).json({message :err.message })
   }
} else{

    return res.status(200).json({message : "Something Wrong"})
}

 })
 
 export const allrole = catchError(async(req,res) =>{
    const code = req.id.code
    const data = await executeQuery("SELECT name, roleid From tblroles where status=1", `odoads_${code}`)
    if(data){
        return res.status(200).json(data)
    }else{
        return res.status(206).json(data)
    }
    
})

export const deleterole = catchError(async(req,res) =>{
    const code = req.id.code
    if(code){
    const {name} = req.body
    const data = await executeQuery("DELETE FROM tblroles WHERE name = '"+name+"'", `odoads_${code}`)
    if(data){
        return res.status(200).json({message:"Deleted Successfully"})
    }else{
        return res.status(200).json({message:"Deleted Failed"})
    }
    }
 })


 export const updaterole = catchError(async(req,res) =>{
    const {code} = req.id
    const promisies = []
     const {roleData,id} = req.body
     const data = await executeQuery("SELECT can_view  FROM tblrolepermissions  WHERE roleid = "+id+" LIMIT 1", `odoads_${code}`)
     promisies.push(new Promise(async(resolve,reject) =>{
     if(data.length == 0){
             roleData.forEach(async(el) =>{
             const result = await executeQuery("INSERT into tblrolepermissions SET permissionid = (SELECT permissionid from odoads_general_tbl.tblpermissions_bk WHERE shortname = '"+el.short_name+"'), can_view = "+el.can_view+", can_view_own =  "+el.can_view_own+",  can_edit =  "+el.can_edit+", can_create =  "+el.can_create+",can_delete =  "+el.can_delete+", roleid = "+id+" ", `odoads_${code}`)
              if(result){
                  resolve(result)
              }else{
             reject(result)
            }
        })   
     }else{
        roleData.forEach(async(el) =>{
    const value = await executeQuery("UPDATE tblrolepermissions SET  can_view = "+el.can_view+", can_view_own =  "+el.can_view_own+",  can_edit =  "+el.can_edit+", can_create =  "+el.can_create+",can_delete =  "+el.can_delete+"  WHERE roleid = "+id+" && permissionid = (SELECT permissionid from odoads_general_tbl.tblpermissions_bk WHERE shortname = '"+el.short_name+"') ", `odoads_${code}`)
    if(value){
        return   resolve(value)
    }else{
    return reject(value)
    }
}) }
    }))
   try{
    const data = await Promise.all(promisies)
      if(data){

        return res.status(200).json({message : "Role Permission set"})
      }
   }catch(err){

    return res.status(500).json({message : "Error"})
   }
     
 })