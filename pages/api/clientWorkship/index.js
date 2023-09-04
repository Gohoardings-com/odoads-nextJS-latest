import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
import { verifyToken } from "../../../middelware/token";




export default async function handler(req, res){
    const method = req.method
     switch(method){
         case 'POST':await verifyToken(req,res); await addContact(req,res)
         break;
         case 'GET':await verifyToken(req,res); await allCustomers(req,res)
         break;
         case 'PATCH':await verifyToken(req,res); await deleteCustomer(req,res)
         break;
         case 'PUT':await verifyToken(req,res); await updateCustomer(req,res)
         break;     
      }
 }

export const addContact = catchError(async(req,res) =>{
    const code = req.code
    if(code){
    const {id} = req.query
   
    const {file, firstname,lastname, email, phone, title } = req.body;

    const insertData = await executeQuery("INSERT INTO tblcontacts (userid,firstname,lastname, email, phonenumber, title, datecreated, profile_image ) VALUES ("+id+",'"+firstname+"','"+lastname+"', '"+email+"',"+phone+", '"+title+"', CURRENT_TIMESTAMP, '"+file+"')",  `odoads_${code}`)
if(insertData){
 return res.send("Contact Added Successfully")
}
    }
  
})
export const deleteCustomer = catchError(async(req,res) =>{
    const code = req.code
    if(code){
    const {id} = req.query

    const insertData = await executeQuery("UPDATE tblcontacts SET active = 0 WHERE  id = "+id+"",  `odoads_${code}`)
if(insertData){
 return res.send("Contact Delete Successfully")
}
    }
  
})

export const allCustomers = catchError(async(req,res) =>{
    const database = req.id.code
    if(database){
    const userid = req.id.userid

    const insertData = await executeQuery("SELECT firstname,lastname, email, phonenumber, title, profile_image FROM tblcontacts WHERE  active = 1",  `odoads_${database}`)
if(insertData){
 return res.send(insertData)
}
    }
  
})

export const updateCustomer = catchError(async(req,res) =>{
    const code = req.code
    if(code){
    const {id} = req.query
   
    const {file, firstname,lastname, email, phone, title } = req.body;

    const insertData = await executeQuery("UPDATE tblcontacts SET firstname = '"+firstname+"',lastname = '"+lastname+"', email = '"+email+"', phonenumber = "+phone+", title = '"+title+"', profile_image = '"+file+"' WHERE  id = "+id+"",  `odoads_${code}`)
if(insertData){
 return res.send("Contact Updated Successfully")
}
    }
  
})
