import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
import { verifyToken } from "../../../middelware/token";

export default async function handler(req, res){
    const method = req.method
     switch(method){
         case 'POST': await verifyToken(req,res);await addCustomer(req,res)
         break;
         case 'GET':await verifyToken(req,res);await allCustomers(req,res)
         break;
         case 'PATCH':await verifyToken(req,res);await deleteCustomer(req,res)
         break;
         case 'PUT':await verifyToken(req,res);await updateCustomer(req,res)
         break;     
      }
 }
 
 export const addCustomer = catchError(async(req,res) =>{
    const code = req.id.code
    const id = req.id.userid
    if(code){
        const {formData} = req.body
        const {address,billing_city,customer_city,billing_country,billing_state,billing_street,billing_zip,company_name,customer_state,pan,phone,shiping_city,shiping_country,shiping_state,shiping_street,shiping_zip,website,zip
        } = formData
       
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    const result = await executeQuery("INSERT into tblclients SET addedFrom = "+id+",vat = '"+pan+"',company = '"+company_name+"', phonenumber = "+phone+", country = 102, city = (SELECT MAX(id) FROM odoads_general_tbl.tblcities WHERE name = '"+customer_city+"'), zip =  "+zip+", state = (SELECT MAX(id) FROM odoads_general_tbl.tblstates WHERE name = '"+customer_state+"'), address = '"+address+"',website = '"+website+"', datecreated = CURRENT_TIMESTAMP, active = 1,billing_street = '"+billing_street+"',billing_state =(SELECT MAX(id) FROM odoads_general_tbl.tblstates WHERE name = '"+billing_state+"'), billing_city = (SELECT MAX(id) FROM odoads_general_tbl.tblcities WHERE name = '"+billing_city+"'), billing_zip = "+billing_zip+", shipping_street = '"+shiping_street+"', shipping_city = (SELECT Max(id) FROM odoads_general_tbl.tblcities WHERE name = '"+shiping_city+"'), shipping_state = (SELECT MAX(id) FROM odoads_general_tbl.tblstates WHERE name = '"+shiping_state+"'), shipping_zip =  "+shiping_zip+", billing_country = 102, shipping_country = 102", `odoads_${code}`)
if(result){

    return res.status(200).json({message : "Customer Added Successfully"})
} else{

    return res.status(200).json({message : "Something Wrong"})
}
}
 })
 
 export const allCustomers = catchError(async(req,res) =>{
    const code = req.id.code
    const data = await executeQuery("SELECT client.vat,client.billing_street,client.shipping_street,client.shipping_zip, client.billing_zip,client.userid as id ,client.company, client.phonenumber, client.zip, client.address, client.website, city.name as city,shippingcity.name as shipping_city,billingcity.name as billing_city,  state.name as state, country.short_name as country,shppingcountry.short_name as shipping_country, billingcountry.short_name as billing_country, client.datecreated as dateCreated, client.active as active, shippingstate.name as shipping_state, billingstate.name as billing_state  From odoads_"+code+".tblclients as client INNER JOIN tblcities as city ON client.city = city.id  INNER JOIN tblcities as billingcity ON client.city = billingcity.id  INNER JOIN tblcities as shippingcity ON client.city = shippingcity.id  INNER JOIN tblstates as state ON state.id = client.state  INNER JOIN tblstates as billingstate ON billingstate.id = client.billing_state  INNER JOIN tblstates as shippingstate ON shippingstate.id = client.shipping_state INNER JOIN tblcountries as country ON country.country_id = client.country   INNER JOIN tblcountries as shppingcountry ON shppingcountry.country_id = client.country   INNER JOIN tblcountries as billingcountry ON billingcountry.country_id = client.country WHERE client.active = 1", "odoads_general_tbl")
    if(data){
        return res.status(200).json(data)
    }else{
        return res.status(206).json(data)
    }
})

export const deleteCustomer = catchError(async(req,res) =>{
    const code = req.id.code
    if(code){
    const {id} = req.body
    const data = await executeQuery("UPDATE tblclients SET active = 0 WHERE userid = "+id+"", `odoads_${code}`)
    if(data){
        return res.status(200).json({message:"Deleted Successfully"})
    }else{
        return res.status(206).json({message:"Deleted Failed"})
    }
    }
 })


 export const updateCustomer = catchError(async(req,res) =>{
    const code = req.id.code
    if(code){
        const {formData} = req.body
        const {id,vat,state, city,phonenumber,company,address,billing_city,shipping_zip,shipping_street,customer_city,billing_state,billing_street,billing_zip,company_name,shipping_state,customer_state,phone,shiping_city,shiping_state,shiping_street,shiping_zip,website,zip,shipping_city
        } = formData

    const result = await executeQuery("UPDATE tblclients SET vat = '"+vat+"',company = '"+company+"', phonenumber = "+phonenumber+", city = (SELECT id FROM odoads_general_tbl.tblcities WHERE name = '"+city+"'), zip =  "+zip+", state = (SELECT id FROM odoads_general_tbl.tblstates WHERE name = '"+state+"'), address = '"+address+"',website = '"+website+"',billing_street = '"+billing_street+"',billing_state =(SELECT id FROM odoads_general_tbl.tblstates WHERE name = '"+billing_state+"'),billing_city = (SELECT id FROM odoads_general_tbl.tblcities WHERE name = '"+billing_city+"'), billing_zip = "+billing_zip+", shipping_street = '"+shipping_street+"', shipping_city = (SELECT id FROM odoads_general_tbl.tblcities WHERE name = '"+shipping_city+"'), shipping_state = (SELECT id FROM odoads_general_tbl.tblstates WHERE name = '"+shipping_state+"'), shipping_zip =  "+shipping_zip+" WHERE userid = "+id+"", `odoads_${code}`)
if(result){
    return res.status(200).json({message : "Customer Updated Successfully"})
} else{
    return res.status(200).json({message : "Something Wrong"})
}
}
 })