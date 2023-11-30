import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
import fs from 'fs';
import path from 'path'

export default async function handler(req, res) {
  const method = req.method; switch (method) {
    case "POST": createVendor(req, res); break;
  }
}

export const createVendor = catchError(async (req, res) => {
  const { code } = req.body;
  const createDtabase = await executeQuery(`CREATE DATABASE odoads_${code}`);        
  if (createDtabase) {
    const sourceFolderPath = path.resolve('./public/media/app');
    const destinationFolderPath = path.resolve('./public/media');
    const folder = await copyFolderWithCustomName(sourceFolderPath, destinationFolderPath, code);         
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
          return res.status(200).json({message : "Database Created"})          
        }        
      } else {
        return res.status(206).json({ message: "Database Not Created" });        
      } 
});

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

