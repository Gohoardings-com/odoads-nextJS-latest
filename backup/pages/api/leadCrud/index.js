import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
import { verifyToken } from "../../../middelware/token";


export default async function handler(req, res){
    const method = req.method
     switch(method){
          case 'GET':await allSubcategory(req, res);
         break;   
         case 'POST': await verifyToken(req,res); await updateLead(req, res);
         break;   
         case 'PUT':await getAllState(req, res);
         break;  
       
         case 'PATCH': getCity(req, res);
         break;  
         default:
            return res.status(405).end(`Method ${method} Not Allowed`); 
     }
 }

 export const updateLead = catchError(async(req,res) =>{
        const databse = req.id.code
    if(databse){
    const {value} = req.body
    const {name,company,country,zip,city,state,address,assignfirst,status,source,email,website,phonenumber, id} = value
        const result = await executeQuery("UPDATE tblleads SET name = '"+name+"',  company = '"+company+"', country = (SELECT Max(country_id) FROM odoads_general_tbl.tblcountries WHERE short_name = '"+country+"'), zip = "+zip+", city = (SELECT Max(id) FROM odoads_general_tbl.tblcities WHERE name = '"+city+"'), state = (SELECT Max(id) FROM odoads_general_tbl.tblstates WHERE name = '"+state+"'), address = '"+address+"', assigned = (SELECT staffid from odoads_"+databse+".tblstaff WHERE firstname = '"+assignfirst+"'), status = (SELECT Max(statusorder) FROM odoads_general_tbl.tblleadsstatus WHERE name = '"+status+"'), source = (SELECT Max(id) FROM odoads_general_tbl.tblleadssources WHERE name='"+source+"'), email = '"+email+"', website = '"+website+"', phonenumber = "+phonenumber+", is_public = 1, date_converted = CURRENT_TIMESTAMP WHERE id = "+id+" ", `odoads_${databse}` )
    if(result){
        return res.status(200).json({message:"Lead Update Successfully"})    
    }else{     
        return res.status(200).json({message:"Something Wrong"})    
  
}
}
 })

 export const getCity = catchError(async(req,res) =>{
    const {name} = req.body
 const value = await executeQuery("SELECT name, id FROM tblcities WHERE state_id = (SELECT id from tblstates WHERE name = '"+name+"')", `odoads_general_tbl`)
 if(value){
        return res.send(value)
}
 })

 export const getAllState = catchError(async(req,res) =>{
 const data = await executeQuery("SELECT name, id FROM tblstates", `odoads_general_tbl`)
    if(data){
        return res.status(200).json(data)
    }
 })

 export  const allSubcategory = catchError(async(req,res,next) =>{
    const data = await executeQuery("SELECT name FROM tblmedia_categories","odoads_general_tbl") 
   if(data){
       return res.status(200).json(data)
   }
 })