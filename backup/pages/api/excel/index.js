const { executeQuery } = require("../../../conn/conn");
const catchError = require("../../../middelware/catchError");
const { verifyToken } = require("../../../middelware/token");
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
        default:
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
};

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
