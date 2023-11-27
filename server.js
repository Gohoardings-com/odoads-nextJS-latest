const next = require('next');
const express = require('express');
const path = require('path');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const { createServer } = require('http');
const { parse } = require('url');
const handle = app.getRequestHandler();
const nodemailer = require('nodemailer');
const fs = require('fs');
const Handlebars = require('handlebars');
const pdf = require('html-pdf');
const cors = require('cors');
const crypto = require ('crypto');
var uniqid = require('uniqid');
var axios = require('axios');
var sha256 = require('sha256');

// Increase the maximum number of listeners
require('events').EventEmitter.defaultMaxListeners = 25;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});

const imageServer = express();
const port = 3001;
imageServer.use(express.json());
imageServer.set('view engine', 'hbs');
imageServer.use(cors({
  origin: 'http://localhost:3000',
}));


imageServer.post('/invoice', async (req, res) => {
  const { finalState, addData } = req.body;

  const items = addData.map((data, index) => ({
    SNO: (index + 1).toString(),
    Description: data.Description,
    HSN: data.item,
    Size: data.item,
    Area: data.total,
    Quantity: data.unit,
    Rate: data.rate,
    Uom: data.total,
    Amount: data.unit,
  }));

  const template = fs.readFileSync('invoice-template.hbs', 'utf-8');
  const compiledTemplate = Handlebars.compile(template);

  const invoiceData = {
    items: items,
    amount: finalState.amount,
    address: finalState.bill_ship,
    invoice: finalState.invoice,
  };

  const renderedHtml = compiledTemplate(invoiceData);

  const pdfOptions = {
    format: 'Letter',
  };

  // Generate PDF
  try {
    const pdfBuffer = await new Promise((resolve, reject) => {
      pdf.create(renderedHtml, pdfOptions).toBuffer((err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
    });

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.elasticemail.com',
      port: 587,
      auth: {
        user: 'uday@gohoardings.com',
        pass: 'C716EBDA695B6B1CAA6866C046F21C4C9B5D',
      },
    });

    const attachments = [
      {
        filename: 'invoice.pdf',
        content: pdfBuffer,
      },
    ];

    // Setup email data
    const mailOptions = {
      from: 'uday@gohoardings.com',
      to: 'bussduro@gmail.com',
      subject: 'TESTING',
      text: 'TEST 121 AND 123',
      attachments: attachments,
    };

    // Send email using the transporter
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).send('Email sent successfully');
      }
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return res.status(500).send('Error generating PDF');
  }
});



// SendEmail endpoint
imageServer.post('/send-email', (req, res) => {
  // Get the email details from the request body
  // const { to, subject, text } = req.body;
  // const attachments = [];

  // try {
  //   // Check if any attachments were sent
  //   if (req.files) {
  //     for (let fileKey in req.files) {
  //       const file = req.files[fileKey];
  //       const attachment = {
  //         filename: file.name,
  //         content: file.data,
  //       };
  //       attachments.push(attachment);
  //     }
  //   }


});

imageServer.post('/handlePay', async (req,res) => {
  try {
    const merchantTransactionId = uniqid('T');
    const data = {
        merchantId: 'M16GKDDZZQAI',
        merchantTransactionId: merchantTransactionId,
        merchantUserId: "MUID1433423",
        name: "uday",
        amount: 100,
        redirectUrl: `http://localhost:3000/api/phonepe/${merchantTransactionId}`,
        redirectMode: 'PUT',
        mobileNumber: "9999999999",
        paymentInstrument: {
            type: 'PAY_PAGE'
        }
    };
    
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString('base64');
    const keyIndex = 1;
    const salt_key = '2096f083-a33e-4b4f-a418-8733b13060aa'
    const string = payloadMain + '/pg/v1/pay' + salt_key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    
    const checksum = sha256 + '###' + keyIndex;
    
    const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
    const options = {
        method: 'POST',
        url: prod_URL,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum
        },
        data: {
            request: payloadMain
        }
    };
    
    axios.request(options).then(function (response) {
        return res.redirect(response.data.data.instrumentResponse.redirectInfo.url)
    })
    .catch(function (error) {
        console.error(error);
    });

} catch (error) {
    res.status(500).send({
        message: error.message,
        success: false
    })
}
})

// Assuming the 'public' folder is in the root directory
const uploadDirectory = path.join(__dirname, 'public', 'upload');

// Serve static files from the 'upload' directory with '/upload' as the base URL
imageServer.use('/upload', express.static(uploadDirectory));

imageServer.listen(port, () => {
  console.log(`Image server listening on port ${port}`);
});