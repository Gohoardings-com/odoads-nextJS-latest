const { executeQuery } = require("../../../conn/conn");
const catchError = require("../../../middelware/catchError");
const { verifyToken, outverifyToken,token } = require("../../../middelware/token");
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');

module.exports = async function handler(req, res) {
    const method = req.method;
    switch (method) {
        case 'POST':
            await verifyToken(req, res);
            await excel(req, res);
            break;
        case 'PUT':
            await outverifyToken(req, res);
            updatePlan(req,res)
            break;
        default:
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
};

export const updatePlan = catchError(async (req, res) => {
    const {code} = req.id;
    const {amount} = req.body;
    let plan,type;
    switch (amount) {
        case 0 :
          plan = "free";
          type = "forever";
          break;
        case 6000 :
            plan = "professional";
            type = "month";
          break;
        case 79200 :
            plan = "professional";
            type = "year";
          break;
        case 11000 :
            plan = "enterprise";
            type = "month";
          break;
        case 132000 :
            plan = "enterprise";
            type = "year";
          break;
        default:
          break;
      }

      const sql = `UPDATE tblcompanies SET paid = 1, Plan = '${plan}' , Plan_type = '${type}', db_created = 'yes' WHERE code = '${code}'`;
      const test = await createVendor(code);
      if (test) {
        await addUser(code,res);
      }
      await executeQuery(sql,"odoads_tblcompanies");
      
      // return res.status(206).json({ success: true, message: "success" });

})


async function createVendor (code) {
  const createDtabase = await executeQuery(`CREATE DATABASE odoads_${code}`);        
  if (createDtabase) {
    const sourceFolderPath = path.resolve('./public/media/app');
    const destinationFolderPath = path.resolve('./public/media');
    const folder = await copyFolderWithCustomName(sourceFolderPath, destinationFolderPath, code);  
    if (folder) {
        console.log(folder);
    }        
    const data = await executeQuery("SHOW TABLES", "odoads_app");                 
    if (data) {            
      data.forEach(async (table) => {              
        const createTableQuery = `CREATE TABLE IF NOT EXISTS odoads_${code}.${table.Tables_in_odoads_app} LIKE odoads_app.${table.Tables_in_odoads_app}`;              
        const insertDataQuery = `INSERT INTO odoads_${code}.${table.Tables_in_odoads_app} SELECT * FROM odoads_app.${table.Tables_in_odoads_app}`;              
        const value = await executeQuery(createTableQuery, `odoads_${code}`);                       
          if (value) {                
            await executeQuery(insertDataQuery, `odoads_${code}`);            
           }            
          });         
          return true;        
        }        
      } else {
        return false;        
      } 
    };

async function copyFolderWithCustomName(sourceFolder, destinationFolder, name, isRoot = true) {
  const newFolderName = isRoot ? name : path.basename(sourceFolder);
  const newFolderPath = path.join(destinationFolder, newFolderName);

  try {
    if (!fs.existsSync(newFolderPath)) {
      fs.mkdirSync(newFolderPath, { recursive: true });
    }

    const filesAndSubfolders = fs.readdirSync(sourceFolder);

    for (const item of filesAndSubfolders) {
      const sourcePath = path.join(sourceFolder, item);
      const destinationPath = path.join(newFolderPath, item);

      if (fs.statSync(sourcePath).isFile()) {
        fs.copyFileSync(sourcePath, destinationPath);
      } else if (fs.statSync(sourcePath).isDirectory()) {
        copyFolderWithCustomName(sourcePath, newFolderPath, name, false);
      }
    }
    return newFolderName;
  } catch (err) {
    console.error('Error copying folder:', err);
  }
}

export const excel = catchError(async (req, res) => {
    const { ID, data } = req.body;
    if (!ID) {
        return res.status(206).json({ success: false, message: "Try Again" });
    }

    try {
        const sql = await executeQuery("SELECT DISTINCT mediaid, userid, mediatype FROM goh_shopping_carts_item WHERE campaigid = " + ID + " && status=1", "gohoardi_goh");
        if (sql) {
            const file = await convertJsonToExcel(data, ID);
            const fileName = "plan.xlxs";

            res.writeHead(200, {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="${fileName}"`
              });

            const fileStream = fs.createReadStream(file);
            fileStream.pipe(res);
        } else {
            return res.status(206).json({ success: false, message: "Data Not Found" });
        }
    } catch (err) {
        return res.status(400).json({ success: false, message: "Database Error" });
    }
});


const convertJsonToExcel = async (data, ID) => {
  const workSheet = XLSX.utils.json_to_sheet(data);

  const workBook = XLSX.utils.book_new();
  
  XLSX.utils.book_append_sheet(workBook, workSheet, "Campaign");

  // Specify the full path, including the directory, where you want to save the file
  const filePath = path.join(`./docs/GOH${ID}.xlsx`);

  // Use the XLSX.writeFile to save the file directly and add a return statement to wait for the file writing process to complete
  await XLSX.writeFile(workBook, filePath);

  return filePath;
}


async function addUser(code,res){
  const userData = await executeQuery("SELECT code,contact_email, name, contact_password, contact_phone FROM tblcompanies WHERE id = (SELECT Max(id) FROM tblcompanies)", "odoads_tblcompanies")
  if (userData) {
    const code = userData[0].code
    const img_url = "https://odoads.com/imgs/man.png";
    await executeQuery("INSERT into tblstaff SET staffid=2, email = '" + userData[0].contact_email + "', firstname = '" + userData[0].name + "', phonenumber = " + userData[0].contact_phone + ", password ='" + userData[0].contact_password + "', role=3 , profile_image = '"+img_url+"', datecreated = CURRENT_TIMESTAMP", `odoads_${code}`)
    const id = `2&${code}`
    token(id, 200, res);
  } else {
    return false;
  }
}
