import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
import { token, verifyToken } from "../../../middelware/token";
import  cookie from 'cookie'
export default async function handler(req, res) {
    const method = req.method
    switch (method) {

        case 'DELETE': await verifyToken(req, res); await deleteMedia(req, res);
            break;
        case 'PUT': await verifyToken(req, res); await updateMedia(req, res);
            break;
        case 'PATCH': await verifyToken(req, res); await deleteLead(req, res);
            break;
        case 'GET': await verifyToken(req, res); await getPermissions(req, res);
            break;
      
        default:
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}

export const deleteMedia = catchError(async (req, res) => {
    const databse = req.id.code
    if (databse) {
        const { id } = req.query
  
        const data = await executeQuery("UPDATE tblmedia_deails SET isDelete = 1 WHERE id = " + id + "", `odoads_${databse}`)
        if (data) {
        
            return res.status(200).json("Media Deleted Successfully")
        } else {
        
            return res.status(206).json("Something Wrong Here")
        }
    }
})

export const updateMedia = catchError(async (req, res) => {
    const code = req.id.code
    const cityList = 17
    if (code) {
        const { state } = req.body
        if (state) {
            const { id } = req.query
            const getOldData = await executeQuery("SELECT category_id  FROM  tblmedia_deails WHERE id = " + id + "", `odoads_${code}`)
            const { name, longitude, illumination, lengthofmedia, mediaPrice, priceOption, mediaImage, category, subcategory, width, height, size, footfall, city, district, FTF, location, areadescription, traded, startDate, endDate, mediastartDate } = state
            let $tblnm;
            let updateCtegoryfield = ''
            switch (category) {
                case "Mall Media": $tblnm = 3; break;
                case "Traditional OOH Media": $tblnm = 20; break;
                case "Digital OOH": $tblnm = 100; break;
                case "Airpot Media": $tblnm = 104; break;
                case "Offices": $tblnm = 105; break;
                case "In Flight Media": $tblnm = 106; break;
                case "Transit Media": $tblnm = 107; break;
            }
            if ($tblnm !== getOldData[0].category_id) {
                const lh = "SELECT code  FROM tblmedia_deails WHERE code LIKE '%GOH" + $tblnm + category[0] + "%'  ORDER BY ID DESC LIMIT 1"
                const lastdata = await executeQuery(lh, `odoads_${code}`)
                let Mediacode = ''
                if (lastdata.length == 1) {
                    const splits = lastdata[0].code.split(category[0])
                    const increaseID = parseInt(splits[1]) + 1
                    Mediacode = `GOH${$tblnm + category[0] + increaseID}`
                } else {
                    Mediacode = `GOH${$tblnm + category[0] + 1}`
                }
                updateCtegoryfield = "category_id = " + $tblnm + ", code = '" + Mediacode + "' ,"
            }

            const result = await executeQuery("SELECT id, name FROM tblmedia_categories WHERE name='" + subcategory + "' UNION ALL SELECT id, state_id FROM tblcities WHERE name='" + city + "'", "odoads_general_tbl")
            if (result) {
                const Subcategory_id = result[0].id
                let cityid, state;
                if (!result[1]) {
                    cityid = city
                    state = cityList
                } else {
                    cityid = result[1].id
                    state = result[1].name
                }
                const newMedia = "UPDATE tblmedia_deails SET sub_category_id = " + Subcategory_id + ", medianame =  '" + name + "', " + updateCtegoryfield + " totalno = " + lengthofmedia + ", price =  " + mediaPrice + ", pricetype = '" + priceOption + "', thumbnail = '" + mediaImage + "', state = " + state + ", city = " + cityid + ", district = '" + district + "', width = " + width + ",widthunit = '" + size + "', height =  " + height + ", heightunit = '" + size + "', foot_fall = " + footfall + ", illumination =  '" + illumination + "', ftf = '" + FTF + "', areadescription = '" + areadescription + "', location = '" + location + "', geolocation =  '" + longitude + "', allocate_start_date = '" + startDate + "', allocate_end_date = '" + endDate + "', available_date = '" + mediastartDate + "',syncstatus = 'added', modify_date = CURRENT_TIMESTAMP WHERE id = " + id + ""
                const data = await executeQuery(newMedia, `odoads_${code}`)
                if (data) {
                    return res.status(200).json("Media Updated Successfully")
                } else {
                    return res.status(206).json("Something Wrong Here")
                }
            } else {
                return res.status(206).json({ message: "Empty Fields" })
            }                                                                                                                                                                                                                                                            
        }
    }
})

 
// Delete api pending
export const deleteLead = catchError(async(req,res) =>{
    const databse = req.id.code
if(databse){
    const { id } = req.query
   const data = await executeQuery("UPDATE tblleads SET  leadorder = 0 WHERE id = "+id+" ", `odoads_${databse}`)
    if(data){
     return res.status(200).json("Success")
    }else{
        return res.status(200).json("No Lead")
    }
}

})
// Delete api pending
export const getPermissions = catchError(async(req,res) =>{
    const databse = req.id.code
if(databse){
const {id} = req.query

   const data = await executeQuery("SELECT staff.staffid,staff.phonenumber,staff.datecreated,staff.firstname,staff.facebook, staff.linkedin, staff.skype ,staff.lastname, staff.email, role.name as role from tblstaff as staff INNER JOIN tblroles as role ON role.roleid = staff.role INNER JOIN tblstaffpermissions as permission ON permission.staffid = staff.staffid WHERE staff.staffid = "+id+"", `odoads_${databse}`)
    if(data){
       const permissions = await executeQuery("SELECT permission_name.name,permission_name.shortname,permission.can_view,permission.can_edit,permission.can_view_own,permission.can_create,permission.can_delete FROM  tblstaffpermissions as permission INNER JOIN odoads_general_tbl.tblpermissions_bk as permission_name ON permission_name.permissionid = permission.permissionid WHERE  permission.staffid = "+id+"",  `odoads_${databse}`)
 await permissions.map(async(el) =>{
 await data.map((ab) =>{
   ab["permission_name"] = el.name
   ab["shortname"] = el.shortname
   ab["can_view"] = el.can_view
   ab["can_edit"] = el.can_edit
   ab["can_view_own"] = el.can_view_own
   ab["can_delete"] = el.can_delete
  })
  })
       return res.status(200).json(data)
    }else{
        return res.status(200).json("No Lead")
    }
}

})
