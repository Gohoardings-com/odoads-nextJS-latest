import { log } from "console";
import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
import { verifyToken } from "../../../middelware/token";
const Razorpay = require("razorpay");
const shortid = require("shortid");
import crypto from 'crypto';
var uniqid = require('uniqid');
var axios = require('axios');
var sha256 = require('sha256');

export default async function handler(req, res) {
  const method = req.method;
  switch (method) {
    case "POST":
      handlePay(req, res);
      break;
    case "PUT":
      await verifyToken(req, res);
      verifyPay(req, res);
      break;
    case "PATCH":
      await verifyToken(req, res);
      refundPay(req, res);
      break;
    case "GET":
      await verifyToken(req, res);
      getUser(req, res);
      break;
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}


export const getUser = catchError(async (req, res, next) => {
  const { code } = req.id;

  const query = `SELECT paid from tblcompanies WHERE code = '${code}'`;

  const data = await executeQuery(query, "odoads_tblcompanies");

  if (data[0].paid == 1) {
    return res.status(206).json({ success: true, message: "success" });
  } else {
    return res.status(206).json({ success: false, message: "plan" });
  }

 
});

export const refundPay = catchError(async (req, res, next) => {

  try {
    const refund = uniqid('R');
    const data = {
        merchantId: 'M16GKDDZZQAI',
        merchantUserId: "MUID1433423",
        originalTransactionId : "T2311241736312206937902",
        merchantTransactionId: "T3v94r6lpcktt9j",
        amount: 1 * 100,
        callbackUrl: `http://localhost:3000/api/phonepe/${refund}`,
    };
    
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString('base64');
    const keyIndex = 1;
    const salt_key = '2096f083-a33e-4b4f-a418-8733b13060aa'
    const string = payloadMain + '/pg/v1/refund' + salt_key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    
    const checksum = sha256 + '###' + keyIndex;
    
    const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/refund"
    const options = {
        method: 'POST',
        url: prod_URL,
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum
        },
        data: {
            request: payloadMain
        }
    };
    
    axios.request(options).then(function (response) {
      console.log(response);
      // await executeQuery(`UPDATE pg_leads SET refund = 1, refund_id = '${response.id}'`,`pg_${code}`);
      // res.json({ success: true, redirectUrl: response.data.data.instrumentResponse.redirectInfo.url });
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

});


export const handlePay = catchError(async (req, res, next) => {
	const { code,amount } = req.body;
  try {
    const merchantTransactionId = uniqid('T');
    const data = {
        merchantId: 'M16GKDDZZQAI',
        merchantTransactionId: merchantTransactionId,
        merchantUserId: "MUID1433423",
        name: "uday",
        amount: amount * 100,
        redirectUrl: `https://odoads.com/api/phonepe/${merchantTransactionId}?code=${code}`,
        redirectMode: 'GET',
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
      res.json({ success: true, redirectUrl: response.data.data.instrumentResponse.redirectInfo.url });
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

});

export const verifyPay = catchError(async (req, res, next) => {

  const merchantTransactionId = res.req.body.transactionId
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

  // CHECK PAYMENT TATUS
  axios.request(options).then(async(response) => {
      if (response.data.success === true) {
          const url = `https://odoads.com`
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

