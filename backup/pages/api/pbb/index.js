import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
import { verifyToken } from "../../../middelware/token";
const pptxgen = require ("pptxgenjs");
const path = require('path')
const XLSX = require('xlsx');
const pptx = new pptxgen();

export default async function handler(req, res){
    const method = req.method
     switch(method){
         case 'POST':  await verifyToken(req,res) ;await blockMedia(req,res);
         break;
         case 'GET':await verifyToken(req,res) ;await pptMedia(req,res);
         break;
         case 'PATCH': await verifyToken(req,res) ;await bookMedia(req,res);
         break;
         case 'PUT': await verifyToken(req,res) ;await docsMedia(req,res);
         break;     
         default:
            return res.status(405).end(`Method ${method} Not Allowed`);   
      }
 }
 

//  export const blockMedia = catchError(async(req,res) =>{

//     const codes = req.id.code
//     if(codes){
//         let promisies = []
//         const {value} = req.body 
//         const extractedData = [];
//         for (const [key, { id, startDate, endDate }] of Object.entries(value)) {
//             extractedData[key] = { id, startDate, endDate };
//           }
//     id.forEach(async(el) =>{
//        promisies.push(new Promise(async(resolve, reject) =>{
//         const query = "SELECT category_id, code FROM tblmedia_deails WHERE isDelete = 0 && id="+el.id+""
//         const data = await executeQuery(query, `odoads_${codes}`)
//         if(data){
//             const value = await executeQuery("UPDATE tblmedia_deails SET isBlocked = 1,  allocate_start_date = "+el.startDate+",allocate_end_date = "+el.endDate+" WHERE id="+el.id+"",  `odoads_${codes}`)
// if(value){
//    resolve(data)
// }       
//         }else{
//             reject(data)
//         }      
//     }))
//     })
//     try{
//         let table_name;
//         const final = await Promise.all(promisies)
//         final.map(async(el) =>{
   
//             switch (el.category_id) {
//                 case 20:
//                     table_name = "goh_media";
//                     break;
//                 case 100:
//                     table_name = "goh_media_digital";
//                     break;
//                 case 107:
//                     table_name = "goh_media_transit";
//                     break;
//                 case 3:
//                     table_name = "goh_media_mall";
//                     break;
//                 case 104:
//                     table_name = "goh_media_airport";
//                     break;
//                 case 106:
//                     table_name = "goh_media_inflight";
//                     break;
//                 case 105:
//                     table_name = "goh_media_office";
//                     break;
//                 default:
//                     table_name = "goh_media";
//             }
//             const result = await executeQuery("Update "+table_name+" SET status = 0 WHERE code = '"+el.code+"'", "gohoardi_goh")
//            if(result){
//     return res.status(200).json({message : "Success"})
//            }
//         })
//     }catch(err){
//         return res.send(err.message)
//     }
// }
//  })

export const pptMedia =  catchError(async(req,res) =>{
    console.log("sajdnsaddasdksad");
})

 export const blockMedia = catchError(async(req,res) =>{

    const codes = req.id.code
    if(codes){
        const {value} = req.body 
        const query = "SELECT category_id, code, isBlocked FROM tblmedia_deails WHERE isDelete = 0 && id="+value+""
        const data = await executeQuery(query, `odoads_${codes}`)
        if(data){
            let block;
            if(data[0].isBlocked == 1){
                        block = " isBlocked = 0" 
            }else{
                block = " isBlocked = 1" 
            }
            const final = await executeQuery("UPDATE tblmedia_deails SET "+block+" WHERE id="+value+"",  `odoads_${codes}`)
if(final){
//     let table_name;
//     switch (data[0].category_id) {
//         case 20:
//             table_name = "goh_media";
//             break;
//         case 100:
//             table_name = "goh_media_digital";
//             break;
//         case 107:
//             table_name = "goh_media_transit";
//             break;
//         case 3:
//             table_name = "goh_media_mall";
//             break;
//         case 104:
//             table_name = "goh_media_airport";
//             break;
//         case 106:
//             table_name = "goh_media_inflight";
//             break;
//         case 105:
//             table_name = "goh_media_office";
//             break;
//         default:
//             table_name = "goh_media";
//     }
//     const result = await executeQuery("Update "+table_name+" SET status = 0 WHERE code = '"+data[0].code+"'", "gohoardi_goh")
//    if(result){

return res.status(200).json({message : "Success"})
//    }
}       
        }else{
            return res.status(206).json("UnSuccess")
        }      
   
    
}
 })

 export const bookMedia = catchError(async(req,res) =>{
        const codes =req.id.code
        let promisies = []
    const {value} = req.body 
    const extractedData = [];
    for (const [key, { id, startDate, endDate }] of Object.entries(value)) {
        extractedData[key] = { id, startDate, endDate };
      }

    extractedData.forEach(async(el) =>{
       promisies.push(new Promise(async(resolve, reject) =>{
    const query = "SELECT category_id, code FROM tblmedia_deails WHERE isDelete = 0 && id="+el.id+""
   
        const data = await executeQuery(query, `odoads_${codes}`)
        if(data){
            const value = await executeQuery("UPDATE tblmedia_deails SET isBooked = 1, allocate_start_date = '"+el.startDate+"',allocate_end_date = '"+el.endDate+"' WHERE id="+el.id+"",  `odoads_${codes}`)

            if(value){
   resolve(data)
} else{
    reject(data)
}         
        }   else{
            return res.status(206).json({message:"No data found"})
        }
    }))
    })
    try{
        let table_name;
        const final = await Promise.all(promisies)
        final.map(async(el) =>{
   
            switch (el.category_id) {
                case 20:
                    table_name = "goh_media";
                    break;
                case 100:
                    table_name = "goh_media_digital";
                    break;
                case 107:
                    table_name = "goh_media_transit";
                    break;
                case 3:
                    table_name = "goh_media_mall";
                    break;
                case 104:
                    table_name = "goh_media_airport";
                    break;
                case 106:
                    table_name = "goh_media_inflight";
                    break;
                case 105:
                    table_name = "goh_media_office";
                    break;
                default:
                    table_name = "goh_media";
            }
            const result = await executeQuery("Update "+table_name+" SET isBooked = 1 WHERE code = '"+el.code+"'", "gohoardi_goh")
           if(result){
    return res.status(200).json({message : "Success"})
           }
        })
    }catch(err){
        return res.send(err.message)
    }

 })

 export const docsMedia = catchError(async(req,res) =>{
    const codes = req.id.code
    if(codes){
        const {docs, model} = req.body
      
        if(docs === "excel"){
            const workSheet = XLSX.utils.json_to_sheet(model);
                const workBook = XLSX.utils.book_new();
                
                XLSX.utils.book_append_sheet(workBook, workSheet, "students")
                // Generate buffer
                XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
            
                // Binary string
                XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
                const dirPath0 = __dirname.replace(/\.next.*/i, '');
                const dirPath1 = path.join(dirPath0, 'pages');
                const dirPath = dirPath1.replace('\\pages\\api', '');
                const filePath = path.join(dirPath, 'api/pbb/excel', `GOH.xlsx`);
                XLSX.writeFile(workBook, filePath)
            
                return filePath;
        }else{
             // 1. Create a new Presentation
        let pres = new pptxgen();
        pres.layout = 'LAYOUT_4x3';
        
        // 2. Add a Slide
        let slide1 = pres.addSlide();
        
        // Image by local URL
        slide1.addImage({ path: "https://odoads.com/assets/img/preview/home-blocks-and-elements.png",w:'100%', h:'100%' });
      
        model.forEach(element => {
          const thumbnail = "https://gohoardings_solution.odoads.com/media/gohoardings_solution/media/images/1634883752download.jpg"
        //  element.thumbnail.startsWith("https")
        //     ? element.thumbnail
        //     : `https://${element.codes
        //         .trim()
        //         .split(" ")
        //         .slice(0, 2)
        //         .join("_")
        //         .toLowerCase()}.odoads.com/media/${element.codes
        //         .trim()
        //         .split(" ")
        //         .slice(0, 2)
        //         .join("_")
        //         .toLowerCase()}/media/images/new${element.thumbnail}`;
        
          const slide = element.code = pres.addSlide();
          slide.addShape(pptx.shapes.RECTANGLE, { x: 0.25,y: 2.25,w: 5.5,h: 4.5,fill: { color: "FFFFFF" }, shadow: {type: "outer",angle: 45,blur: 5,ofet: 2,color: "808080"}});
          slide.addImage({ path: thumbnail ,w:'50%', h:'50%', x:'5%',y:'35%' });
        
          let textboxText = [
            { text: "Site name : "+element.medianame+"", options: { fontSize: 20, color: "000000", breakLine: true } },
            { text: "Media Type : "+element.subcategory+"", options: { fontSize: 20, color: "000000", breakLine: true } }
          ];
          let textboxText2 = [
            { text: "CAMPAIGN DETAILS OF", options: { fontSize: 24, color: "000000", breakLine: true , bold : true} },
          ];
          let textboxText3 = [
            { text: "SITE", options: { fontSize: 24, color: "000000", breakLine: true , bold : true} },
          ];
          let textboxText4 = [
            { text: "Name : "+element.medianame+"", options: { fontSize: 15, color: "000000", breakLine: true } },
            { text: "Media Type : "+element.subcategory+"", options: { fontSize: 15, color: "000000", breakLine: true } },
            { text: "City : "+element.city+"", options: { fontSize: 15, color: "000000", breakLine: true } },
            { text: "Location : "+element.location+"", options: { fontSize: 15, color: "000000", breakLine: true } },
            { text: "GEO Location : "+element.geolocation+"", options: { fontSize: 15, color: "000000", breakLine: true } },
            { text: "Size : "+element.width+ "*" +element.height+"", options: { fontSize: 15, color: "000000", breakLine: true } },
            { text: "Illumination : "+element.illumination+"", options: { fontSize: 15, color: "000000", breakLine: true } },
            { text: "Price : "+element.price+"", options: { fontSize: 15, color: "000000", breakLine: true } },
            { text: "Foot fall : "+element.foot_fall+"", options: { fontSize: 15, color: "000000", breakLine: true } },
          ];
          slide.addShape(pptx.shapes.RECTANGLE, { x: '0%', y: '0%', w: '100%', h: '20%', fill: { color: "FFFF00" }, line: { type: "none" } });
          slide.addText(textboxText, { w:'100%',h:'20%', x:'3%',y:'0%', fontSize:24});
          slide.addText(textboxText2,{ w:'35%',h:'20%', x:'62%',y:'-2%', fontSize:24});
          slide.addText(textboxText3,{ w:'20%',h:'20%', x:'75%',y:'3%', fontSize:24});
          slide.addText(textboxText4,{ w:'35%',h:'20%', x:'65%',y:'28%', fontSize:16});
          slide.addShape(pptx.shapes.RECTANGLE, { x: '60%', y: '10%', w: '0.2%', h: '80%', fill: { color: "000000" }, line: { type: "none" } });
          slide.addShape(pptx.shapes.RECTANGLE, { x: '62%', y: '20%', w: '1.5%', h: '35%', fill: { color: "FFFF00" }, line: { type: "none" } });
          slide.addShape(pptx.shapes.RECTANGLE, { x: '65%', y: '80%', w: '30%', h: '2%', fill: { color: "000000" }, line: { type: "none" } });
          slide.addImage({ path: "https://gohoardings.com/images/web_pics/logo.png" ,w:'20%', h:'5%', x:'70%',y:'85%' });
        });
        
        let slide3 = pres.addSlide();
        slide3.addImage({ path: "https://gohoardings.com/images/web_pics/footerppt.jpg",w:'100%', h:'100%' });
        
        // path of file to create and name
        const dirPath0 = __dirname.replace(/\.next.*/i, '');
        const dirPath1 = path.join(dirPath0, 'pages');
        const dirPath = dirPath1.replace('\\pages\\api', '');
        const filePath = path.join(dirPath, 'api/pbb/ppt', `GOH$.xlsx`);
   
        // 4. Save the Presentation
        try {
          await pres.writeFile(filePath)
             return filePath;
        } catch(error) {
          return 'Error in creating PPT';
        }
        }
    }
 })