import { executeQuery } from "../../../../conn/conn";
import catchError from "../../../../middelware/catchError";
import { outverifyToken,token } from "../../../../middelware/token";
import crypto from 'crypto';
var axios = require('axios');
import fs from 'fs';
import path from 'path'

export default async function handler(req, res) {
  const method = req.method;
  switch (method) {
    case "GET":
	await outverifyToken(req,res);
      verifyPay(req, res);
      break;
    case "POST":
      verifyRefund(req, res);
      break;
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}


export const verifyRefund = catchError(async (req, res, next) => {
  console.log(req.body);
  return "success"
})


export const verifyPay = catchError(async (req, res, next) => {
  const {code} = req.id;
  const {mid} = req.query
  const merchantTransactionId = mid;
  const merchantId = 'M16GKDDZZQAI'
  const salt_key = '2096f083-a33e-4b4f-a418-8733b13060aa'
  const keyIndex = 1;
  const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const checksum = sha256 + "###" + keyIndex;

  const options = {
  method: 'GET',
  url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
  headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum,
      'X-MERCHANT-ID': `${merchantId}`
  }
  };

  // CHECK PAYMENT STATUS
  axios.request(options).then(async(response) => {
      if (response.data.success === true) {
        const paid = response.data.data.amount / 100;
  var plan,plan_type;
  switch (paid) {
      case 6000:
        plan = "prof",
  plan_type = "monthly"
        break;
      case 79200:
        plan = "prof",
  plan_type = "yearly"
        break;
      case 11000:
        plan = "ent",
  plan_type = "monthly"
        break;
      case 132000:
        plan = "ent",
  plan_type = "yearly"
        break;
      default:
        plan = "yes",
        plan_type = "no"
        break;
        break;
    	}
        const tid = response.data.data.transactionId;
        const payment = "UPDATE tblcompanies SET Plan = '" + plan + "', Plan_type = '" + plan_type + "', paid = 1, mtid = '" + mid + "',tid = '" + tid + "', db_created = 'yes' WHERE code = '" + code + "'";
          await executeQuery(payment, `odoads_tblcompanies`)
          const test = await createVendor(code);
          if (test) {
            await addUser(code,res);
          }
          const url = `https://odoads.com/admin`
          return res.redirect(url)
      } else {
          const url = `https://odoads.com/pricing`
          return res.redirect(url)
      }
  })
  .catch((error) => {
      console.error(error);
  });
});


async function createVendor (code) {
  const createDtabase = await executeQuery(`CREATE DATABASE odoads_${code}`);        
  if (createDtabase) {
    const sourceFolderPath = path.resolve('./../public/media/app');
    const destinationFolderPath = path.resolve('./../public/media');
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


