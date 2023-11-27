import { log } from "console";
import { executeQuery } from "../../../../conn/conn";
import catchError from "../../../../middelware/catchError";
import { verifyToken } from "../../../../middelware/token";
const Razorpay = require("razorpay");
const shortid = require("shortid");
import crypto from 'crypto';
var uniqid = require('uniqid');
var axios = require('axios');
var sha256 = require('sha256');

export default async function handler(req, res) {
  const method = req.method;
  switch (method) {
    case "GET":
	await verifyToken(req,res);
      verifyPay(req, res);
      break;
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

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
        const payment = "UPDATE tblcompanies SET Plan = '" + plan + "', Plan_type = '" + plan_type + "', paid = 1, mtid = '" + mid + "',tid = '" + tid + "' WHERE code = '" + code + "'";
        console.log(payment)
  const result = await executeQuery(payment, `odoads_tblcompanies`)
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

