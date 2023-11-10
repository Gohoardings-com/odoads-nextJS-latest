import { log } from "console";
import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
import { verifyToken } from "../../../middelware/token";
const Razorpay = require("razorpay");
const shortid = require("shortid");
import crypto from 'crypto';

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
  const { id } = req.body;
  const { code } = req.id;

  const data = await executeQuery(`SELECT payment_id, paid FROM pg_leads WHERE id = ${id}`, `pg_${code}`)

  const amount = data[0].paid;
  const paymentId = data[0].payment_id;

if (req.method === "PATCH") {

  const razorpay = new Razorpay({
    key_id: 'rzp_test_cSCGi16XKuPDax',
    key_secret: 'wFbC2wFabuhGcUj5m8Stlrs5',
  });

  const options = {
    amount: (amount / 2 * 100).toString(),
    speed : 'optimum'
  };

  try {
    const response = await razorpay.payments.refund(paymentId,options)
    const result = await executeQuery(`UPDATE pg_leads SET refund = 1, refund_id = '${response.id}'`,`pg_${code}`);
    if (result) {
      return res.json(response);
    }
  } catch (err) {
   
    res.status(400).json(err);
  }
} else {
  return res.status(206).json({ message : "error"})
}

});

export const handlePay = catchError(async (req, res, next) => {

    const { amount } = req.body;

  if (req.method === "POST") {

    const razorpay = new Razorpay({
      key_id: 'rzp_test_cSCGi16XKuPDax',
      key_secret: 'wFbC2wFabuhGcUj5m8Stlrs5',
    });

    const payment_capture = 1;
    const currency = "INR";
    const options = {
      amount: (amount * 100 ).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
    
      res.status(400).json(err);
    }
  } else {
    return res.status(206).json({ message : "error"})
  }
});

export const verifyPay = catchError(async (req, res, next) => {

  if (req.method === 'PUT') {
    const { pay_id,order_id,res_signature} = req.body;
  
    // const {deposite,email,number,rent,room_type,shifting_date,tenant_name,pg_name,pg_address,bed_number,bed_id,pg_id,code} = details;
    const razorpay = new Razorpay({
        key_id: 'rzp_test_cSCGi16XKuPDax',
        key_secret: 'wFbC2wFabuhGcUj5m8Stlrs5',
      });

    try {
      // Calculate the HMAC-SHA256 signature
      const hmac = crypto.createHmac('sha256', 'wFbC2wFabuhGcUj5m8Stlrs5');
      hmac.update(`${order_id}|${pay_id}`);
      const generated_signature = hmac.digest('hex');

      if (generated_signature === res_signature) {
        // const data =  await razorpay.payments.fetch(pay_id)
    //     const paid = data.amount / 100;
    //     const lead = "INSERT INTO `pg_leads` (`order_id`, `name`, `phone`, `email`, `shift_date`, `room_type`, `rent`, `deposit`, `paid`, `status`,`accepted`, `bed_number`,`bed_id`,`pg_id`,`pg_name`,`pg_location`, `payment_id`) VALUES ( '"+data.order_id+"', '"+tenant_name+"', '"+number+"', '"+email+"', '"+shifting_date+"', '"+room_type+"', "+rent+", "+deposite+", "+paid+",1,1,"+bed_number+","+bed_id+","+pg_id+", '"+pg_name+"', '"+pg_address+"', '"+pay_id+"')"
    //     await executeQuery(lead, `pg_${code}`)
    //     const payment = "INSERT INTO `pg_payments` (`email`, `order_id`, `amount`, `payment_id`, `status`, `name`, `signature`) VALUES ( '"+email+"', '"+data.order_id+"', "+paid+", '"+pay_id+"', '1', '"+tenant_name+"', '"+res_signature+"')"
    //     const result = await executeQuery(payment, `pg_${code}`)
    //     if (result) {
    //         return res.status(200).json({ status: 'success' });
    //     }
    //   } else {
      
    //     res.status(400).json({ status: 'failed' });
        return res.status(200).json({ status: 'success' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error' });
    }
  } else {
    res.status(405).end();
  }
});

