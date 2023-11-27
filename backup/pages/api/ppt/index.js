const { executeQuery } = require("../../../conn/conn");
const catchError = require("../../../middelware/catchError");
const { verifyToken } = require("../../../middelware/token");
const pptxgen = require("pptxgenjs");
const path = require('path');
const fs = require('fs');
const pptx = new pptxgen();

module.exports = async function handler(req, res) {
    const method = req.method;
    switch (method) {
        case 'POST':
            await verifyToken(req, res);
            await ppt(req, res);
            break;
        default:
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
};

export const ppt = catchError(async (req, res) => {
    const { ID, data } = req.body;
    if (!ID) {
        return res.status(206).json({ success: false, message: "Try Again" });
    }

    try {
        const sql = await executeQuery("SELECT DISTINCT mediaid, userid, mediatype FROM goh_shopping_carts_item WHERE campaigid = " + ID + " && status=1", "gohoardi_goh");
        if (sql) {
            const file = await convertJsonToPPT(data, ID);
            const fileName = "plan.pptx";

            res.writeHead(200, {
                "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                "Content-Disposition": `attachment; filename="${fileName}"`
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

const convertJsonToPPT = async (data, ID) => {

    // 1. Create a new Presentation
    let pres = new pptxgen();
    pres.layout = 'LAYOUT_4x3';

    // 2. Add a Slide
    let slide1 = pres.addSlide();

    // Image by local URL
    slide1.addImage({ path: "https://gohoardings.com/images/web_pics/headerppt.jpg", w: '100%', h: '100%' });


    data.forEach(element => {
        const filename = path.basename(element.thumbnail);
        const thumb = path.join(process.cwd(), `public/upload/${filename}`);
        const slide = element.code = pres.addSlide();
        slide.addShape(pptx.shapes.RECTANGLE, { x: 0.25, y: 2.25, w: 5.5, h: 4.5, fill: { color: "FFFFFF" }, shadow: { type: "outer", angle: 45, blur: 5, offset: 2, color: "808080" } });
        slide.addImage({ path: thumb, w: '50%', h: '50%', x: '5%', y: '35%' });

        let textboxText = [
            { text: "Site name : " + element.medianame + "", options: { fontSize: 20, color: "000000", breakLine: true } },
            { text: "Media Type : " + element.subcategory + "", options: { fontSize: 20, color: "000000", breakLine: true } }
        ];
        let textboxText2 = [
            { text: "CAMPAIGN DETAILS OF", options: { fontSize: 24, color: "000000", breakLine: true, bold: true } },
        ];
        let textboxText3 = [
            { text: "SITE", options: { fontSize: 24, color: "000000", breakLine: true, bold: true } },
        ];
        let textboxText4 = [
            { text: "Name : " + element.medianame + "", options: { fontSize: 15, color: "000000", breakLine: true } },
            { text: "Media Type : " + element.subcategory + "", options: { fontSize: 15, color: "000000", breakLine: true } },
            { text: "City : " + element.city + "", options: { fontSize: 15, color: "000000", breakLine: true } },
            { text: "Location : " + element.location + "", options: { fontSize: 15, color: "000000", breakLine: true } },
            { text: "GEO Location : " + element.geolocation + "", options: { fontSize: 15, color: "000000", breakLine: true } },
            { text: "Size : " + element.width + " x " + element.height + "", options: { fontSize: 15, color: "000000", breakLine: true } },
            { text: "Illumination : " + element.illumination + "", options: { fontSize: 15, color: "000000", breakLine: true } },
            { text: "Price : " + element.price + "", options: { fontSize: 15, color: "000000", breakLine: true } },
            { text: "Available Date : " + element.available_date + "", options: { fontSize: 15, color: "000000", breakLine: true } },
        ];
        slide.addShape(pptx.shapes.RECTANGLE, { x: '0%', y: '0%', w: '100%', h: '20%', fill: { color: "FFFF00" }, line: { type: "none" } });
        slide.addText(textboxText, { w: '100%', h: '20%', x: '3%', y: '0%', fontSize: 24 });
        slide.addText(textboxText2, { w: '35%', h: '20%', x: '62%', y: '-2%', fontSize: 24 });
        slide.addText(textboxText3, { w: '20%', h: '20%', x: '75%', y: '3%', fontSize: 24 });
        slide.addText(textboxText4, { w: '35%', h: '20%', x: '65%', y: '28%', fontSize: 16 });
        slide.addShape(pptx.shapes.RECTANGLE, { x: '60%', y: '10%', w: '0.2%', h: '80%', fill: { color: "000000" }, line: { type: "none" } });
        slide.addShape(pptx.shapes.RECTANGLE, { x: '62%', y: '20%', w: '1.5%', h: '35%', fill: { color: "FFFF00" }, line: { type: "none" } });
        slide.addShape(pptx.shapes.RECTANGLE, { x: '65%', y: '80%', w: '30%', h: '2%', fill: { color: "000000" }, line: { type: "none" } });
        slide.addImage({ path: "https://gohoardings.com/images/web_pics/logo.png", w: '20%', h: '5%', x: '70%', y: '85%' });
    });

    let slide3 = pres.addSlide();
    slide3.addImage({ path: "https://gohoardings.com/images/web_pics/footerppt.jpg", w: '100%', h: '100%' });

    var filePath = path.join(`./docs/GOH${ID}.pptx`);
    
    try {
        await pres.writeFile(filePath);
        return filePath;
    } catch (error) {
        throw new Error('Error in creating PPT');
    }
}