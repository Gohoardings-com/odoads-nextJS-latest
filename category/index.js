import { executeQuery } from "../conn/conn";
import catchError from "../middelware/catchError";
import { verifyToken } from "../middelware/token";


export default async function handler(req, res){
    const method = req.method
     switch(method){
         case 'PATCH': verifyToken(req,res); deleteSubcategory(req,res)
         break;
         case 'PUT':verifyToken(req, res); updateSubcategory(req,res)
         break;
         case 'GET':verifyToken(req, res); showSubcategory(req,res)
         break;
         case 'POST':verifyToken(req, res); addSubcategory(req,res)
         break;
         }
        }
 export const showSubcategory = catchError(async(req,res)=> {
    const allSubCategory = await executeQuery("SELECT id, icon,name, status,created_date, CASE WHEN '"+media+"'  = 3 THEN 'Mall Media' WHEN '"+media+"'  = 20 THEN 'Traditional OOH Media'  WHEN '"+media+"'  = 100 THEN 'Digital OOH'  WHEN '"+media+"'  = 104 THEN 'Airpot Media' WHEN '"+media+"'  = 105 THEN 'Offices Media' WHEN '"+media+"'  = 106 THEN 'In Flight Media' ELSE 'Transit Media' END as category FROM tblmedia_categories WHERE status = 1", `odoads_${code}`)
  if(allSubCategory){
    return res.status(200).json(allSubCategory)
  }else{
    return res.status(200).json({message:"Something Wrong"})
  }
})

 export const deleteSubcategory = catchError(async(req,res)=> {
    const {id} = req.query
    const allSubCategory = await executeQuery("UPDATE tblmedia_categories SET status = 0  WHERE id = "+id+"", `odoads_${code}`)
  if(allSubCategory){
      return res.status(200).json({message:"Deleted Successfully"})
    }else{
      return res.status(200).json(allSubCategory)
  }
})

 export const addSubcategory = catchError(async(req,res)=> {
    const {name, media} = req.body
    let $tblnm ;
    switch(media){
        case  "Mall Media" : $tblnm = 3; break;
        case  "Traditional OOH Media" : $tblnm = 20; break;
        case  "Digital OOH": $tblnm = 100; break;
        case "Airpot Media": $tblnm = 104; break;
        case "Offices": $tblnm = 105; break;
        case  "In Flight Media": $tblnm = 106; break;
        case  "Transit Media": $tblnm = 107; break;
            }                                                                                                                                                                                                                                                                                                                                                                                         // '"+media+"', name, status, created_date
  const allSubCategory = await executeQuery("INSERT into  tblmedia_categories (p_id, name, status, created_date) VALUES ("+$tblnm+",'"+name+"', 1, CURRENT_TIMESTAMP )", `odoads_${code}`)
  if(allSubCategory){
    return res.status(200).json(allSubCategory)
  }else{
    return res.status(200).json({message:"Added Successfully"})
  }
})


export const updateSubcategory = catchError(async(req,res)=> {
    const {name, media} = req.body;
    const {id} = req.query;
    let $tblnm = ''
    switch(media){
        case  "Mall Media" : $tblnm = 3; break;
        case  "Traditional OOH Media" : $tblnm = 20; break;
        case  "Digital OOH": $tblnm = 100; break;
        case "Airpot Media": $tblnm = 104; break;
        case "Offices": $tblnm = 105; break;
        case  "In Flight Media": $tblnm = 106; break;
        case  "Transit Media": $tblnm = 107; break;
            }                                                                                                                                                                                                                                                                                                                                                                                         // '"+media+"', name, status, created_date
  const allSubCategory = await executeQuery("UPDATE tblmedia_categories SET p_id = "+$tblnm+", name = '"+name+"', status = 1, modify_date = CURRENT_TIMESTAMP  WHERE id = "+id+"", `odoads_${code}`)
  if(allSubCategory){
    return res.status(200).json(allSubCategory)
  }else{
    return res.status(200).json({message:"Updated Successfully"})
  }
})