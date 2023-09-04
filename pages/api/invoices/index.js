import crypto from "crypto";
import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
import { formatDate, verifyToken } from "../../../middelware/token";

export default async function handler(req, res) {
  const method = req.method;
  switch (method) {
    case "POST":
      await verifyToken(req, res);
      await addInvoives(req, res);
      break;
    case "GET":
      await verifyToken(req, res);
      await invoiceItems(req, res);
      break;
    case "PATCH":
      await verifyToken(req, res);
      await updateInvoice(req, res);
      break;
    case "PUT":
      await verifyToken(req, res);
      await deleteInvoice(req, res);
      break;
  }
}

export const invoiceItems = catchError(async (req, res) => {
  const { code } = req.id;
  if (code) {
    const data = await executeQuery(
      "SELECT billingcountry.short_name as billing_country, shppingcountry.short_name as shpping_country, invoice.discount_total,shippingstate.name as shipping_state, state.name as billing_state,billingcity.name as billing_city, shippingcity.name as shipping_city, invoice.billing_street, invoice.shipping_street, invoice.recurring, invoice.adminnote,staff.firstname as sale_agent,client.company as name,invoice.number,invoice.prefix,invoice.total,invoice.total_tax, invoice.subTotal,invoice.date, invoice.duedate, status.name as status, invoice.billing_zip, invoice.adminnote,invoice.shipping_zip, invoice.total_cycles, invoice.id  FROM tblinvoices as invoice  INNER JOIN tblclients as client ON client.userid = invoice.clientid  INNER JOIN odoads_general_tbl.tblleadsstatus as status ON status.id = invoice.status  INNER JOIN tblstaff as staff  ON invoice.sale_agent = staff.staffid INNER JOIN odoads_general_tbl.tblcities as billingcity ON invoice.billing_city = billingcity.id  INNER JOIN odoads_general_tbl.tblcities as shippingcity ON invoice.shipping_city = shippingcity.id  INNER JOIN odoads_general_tbl.tblstates as state ON state.id = invoice.billing_state   INNER JOIN odoads_general_tbl.tblstates as shippingstate ON shippingstate.id = invoice.shipping_state INNER JOIN odoads_general_tbl.tblcountries as shppingcountry ON shppingcountry.country_id = invoice.shipping_country   INNER JOIN odoads_general_tbl.tblcountries as billingcountry ON billingcountry.country_id = invoice.billing_country",
      `odoads_${code}`
    );
    if (data) {
      const companyData = await executeQuery(
        "SELECT pan, contact_gstin From tblcompanies WHERE code = '" +
          code +
          "'",
        "odoads_tblcompanies"
      );
      if (companyData) {
        data.map((el) => {
          companyData.map((ab) => {
            el["pan"] = ab.pan;
            el["gst"] = ab.contact_gstin;
          });
        });

        return res.send(data);
      }
    }
  }
});

export const addInvoives = catchError(async (req, res) => {
  const { code, userid } = req.id;
  const { finalState, addData } = req.body;
  const { amount, bill_ship, invoice } = finalState;
  const { sub_total, grand_total, gst, discount } = amount;
  const {
    customer,
    invoice_number,
    status,
    start_date,
    end_date,
    recurring_invoice,
    total_cycle,
    admin_note,
    sale_agent,
  } = invoice;
  const {
    billing_street,
    billing_city,
    billing_state,
    billing_zip,
    shipping_street,
    shipping_city,
    shipping_state,
    shipping_zip,
  } = bill_ship;
  const token = crypto.randomBytes(8).toString("hex");
  const invoicesDate = formatDate(start_date);
  const dueDateDate = formatDate(end_date);
  const updateclient = await executeQuery(
    "INSERT into tblinvoices SET allowed_payment_modes = 1,clientid  = (SELECT Max(userid) from tblclients WHERE company = '" +
      customer +
      "'),number = " +
      invoice_number +
      ", prefix ='NCP-', datecreated = CURRENT_TIMESTAMP, date = '" +
      invoicesDate +
      "', duedate = '" +
      dueDateDate +
      "', currency = 1,subtotal = " +
      sub_total +
      ", total_tax = " +
      gst +
      ", total = " +
      grand_total +
      ",discount_total = " +
      discount +
      ", addedfrom  = " +
      userid +
      ", hash = '" +
      token +
      "', status = (SELECT Max(id) FROM odoads_general_tbl.tblleadsstatus  WHERE name = '" +
      status +
      "'), adminnote = '" +
      admin_note +
      "', recurring = " +
      recurring_invoice +
      ", cycles = " +
      total_cycle +
      ", billing_street = '" +
      billing_street +
      "',billing_state = (SELECT Max(id) FROM odoads_general_tbl.tblstates WHERE name = '" +
      billing_state +
      "'), billing_city = (SELECT Max(id) FROM odoads_general_tbl.tblcities WHERE name = '" +
      billing_city +
      "'), billing_zip = " +
      billing_zip +
      ", shipping_street = '" +
      shipping_street +
      "', shipping_city = (SELECT Max(id) FROM odoads_general_tbl.tblcities WHERE name = '" +
      shipping_city +
      "'), shipping_state = (SELECT Max(id) FROM odoads_general_tbl.tblstates WHERE name = '" +
      shipping_state +
      "'), shipping_zip =  " +
      shipping_zip +
      ", billing_country = 102, shipping_country = 102, sale_agent = (SELECT Max(staffid) from tblstaff WHERE firstname  = '" +
      sale_agent +
      "') ",
    `odoads_${code}`
  );
  if (updateclient) {
    addData.map(async (el) => {
      const itemsadded = await executeQuery(
        "INSERT INTO tblitems SET rel_id = (SELECT Max(id) from tblinvoices WHERE clientid = (SELECT Max(userid) from tblclients WHERE company = '" +
          customer +
          "')), rel_type = 'invoice', description = '" +
          el.Description +
          "', long_description = '" +
          el.longDescription +
          "', qty = " +
          el.Item +
          ", rate=" +
          el.Rate +
          ", unit = '" +
          el.unit +
          "', item_order = " +
          el.Item +
          ", tax = (Select Max(id) From odoads_general_tbl.tbltaxes WHERE name = '" +
          el.Tax +
          "')",
        `odoads_${code}`
      );
      if (itemsadded) {
        return res.status(200).json({ message: "Success" });
      }
    });
  }
});

export const updateInvoice = catchError(async (req, res) => {
  const { code } = req.id;
  const { invoice, amount } = req.body;
  const { sub_total, grand_total, gst, discount } = amount;
  const {
    shipping_state,
    billing_state,
    billing_city,
    shipping_city,
    billing_street,
    shipping_street,
    recurring,
    adminnote,
    sale_agent,
    name,
    number,
    date,
    duedate,
    status,
    billing_zip,
    shipping_zip,
    total_cycles,
    id,
  } = invoice;
  const invoicesDate = formatDate(date);
  const dueDateDate = formatDate(duedate);
  const updateclient = await executeQuery(
    "UPDATE tblinvoices SET clientid = (SELECT Max(userid) from tblclients WHERE company = '" +
      name +
      "'),number = " +
      number +
      ",   date = '" +
      invoicesDate +
      "', duedate = '" +
      dueDateDate +
      "', subtotal = " +
      sub_total +
      ", total_tax = " +
      gst +
      ", total = " +
      grand_total +
      ",discount_total = " +
      discount +
      ",  status = (SELECT Max(id) FROM odoads_general_tbl.tblleadsstatus  WHERE name = '" +
      status +
      "'), adminnote = '" +
      adminnote +
      "', recurring = " +
      recurring +
      ", cycles = " +
      total_cycles +
      ", billing_street = '" +
      billing_street +
      "',billing_state = (SELECT Max(id) FROM odoads_general_tbl.tblstates WHERE name = '" +
      billing_state +
      "'), billing_city = (SELECT Max(id) FROM odoads_general_tbl.tblcities WHERE name = '" +
      billing_city +
      "'), billing_zip = " +
      billing_zip +
      ", shipping_street = '" +
      shipping_street +
      "', shipping_city = (SELECT Max(id) FROM odoads_general_tbl.tblcities WHERE name = '" +
      shipping_city +
      "'), shipping_state = (SELECT Max(id) FROM odoads_general_tbl.tblstates WHERE name = '" +
      shipping_state +
      "'), shipping_zip =  " +
      shipping_zip +
      ", billing_country = 102, shipping_country = 102, sale_agent = (SELECT Max(staffid) from tblstaff WHERE firstname  = '" +
      sale_agent +
      "'),subtotal = " +
      sub_total +
      ", total_tax = " +
      gst +
      ", total = " +
      grand_total +
      ",discount_total = " +
      discount +
      " WHERE id = " +
      id +
      "",
    `odoads_${code}`
  );
  if (updateclient) {
    return res.status(200).json({ message: "Success" });
  }
});

export const deleteInvoice = catchError(async (req, res) => {
  const { code } = req.id;
  const { id } = req.body;

  const deleteInvoi = await executeQuery(
    "DELETE from tblinvoices WHERE id = " + id + "",
    `odoads_${code}`
  );
  if (deleteInvoi) {
    const deleteItems = await executeQuery(
      "DELETE from tblitems WHERE rel_id = " + id + "",
      `odoads_${code}`
    );
    if (deleteItems) {
      return res.status(200).json("Success");
    }
  } else {
    return res.status(206).json("Error");
  }
});
