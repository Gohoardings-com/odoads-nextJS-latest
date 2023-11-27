import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ModalBody, ModalFooter } from "react-bootstrap";
import { BiEdit, BiRupee } from "react-icons/bi";
import BillModal from "./billmodal";
import MaterialTable from "@material-table/core";
import AddItem from "./addItem";
import { toast } from "react-toastify";
import {
  createInvoiceApi,
  getAllStaffApi,
  getCustomerApi,
} from "../../../apis/apis";
import axios from "axios";

const Add_Invoice = ({ show, handleClose, allData }) => {
  const Data = {
    customer: "",
    invoice_number: "",
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0],
    payment_mode: "Bank",
    currency: "INR",
    sale_agent: "",
    recurring_invoice: "",
    discount: "00.00",
    total_cycle: "0",
    admin_note: "",
    status: "New",
  };
  const [finalState, setFinalstate] = useState({});
  const [billData, setBillData] = useState([]);
  const [addItem, setAdditem] = useState([]);
  const [formdata, setFormdata] = useState(Data);
  const [staff, setStaff] = useState([]);
  const [addData, setAdddata] = useState([]);
  const [totalRate, setTotalRate] = useState(0);
  const [total, setTotal] = useState(0);
  const [gstAmount, setGstamount] = useState(0);
  const [relatedData, setrelatedData] = useState([]);
  const [amount, setAmount] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const transferBillData = (FormData) => {
    setBillData(FormData);
  };

  const transferAdditem = (FormData) => {
    setAdditem(FormData);
  };

  // bill modal state
  const [showbill, setShowbill] = useState(false);
  const handleClosebill = () => setShowbill(false);
  const handleShow = () => {
    setShowbill(true);
  };

  const mergeAmount = () => {
    setAmount({
      ...amount,
      sub_total: totalRate,
      grand_total: total,
      gst: gstAmount,
      discount: 0,
    });
  };

  useEffect(() => {
    mergeAmount();
  }, [totalRate, total, gstAmount]);

  const handleFormSubmit = (TableData) => {
    setAdddata([...addData, TableData]);
    const Gst = 18;
    const sub_total = addData.reduce(
      (sum, item) => sum + item.total,
      TableData.total
    );
    const gstamount = (sub_total * Gst) / 100;
    const GrandTotal = sub_total + gstamount;
    setGstamount(gstamount);
    setTotal(GrandTotal);
    setTotalRate(sub_total);
  };

  const [showadd, setShowadd] = useState(false);
  const handleCloseadd = () => setShowadd(false);
  const handleShowadd = () => {
    setShowadd(true);
  };

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  //marge all state
  const mergeStates = () => {
    setFinalstate({
      ...finalState,
      bill_ship: billData,
      invoice: formdata,
      amount: amount,
    });
  };

  useEffect(() => {
    mergeStates();
  }, [billData, formdata, addData, amount]);

  //create invoice api
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formdata.customer !== "" &&
      formdata.invoice_number !== "" &&
      formdata.start_date !== "" &&
      formdata.end_date !== "" &&
      formdata.sale_agent !== "" &&
      formdata.recurring_invoice !== "" &&
      formdata.status !== "" &&
      formdata.admin_note !== "" &&
      billData.length !== 0 &&
      addData.length !== 0
    ) {
      const data = await createInvoiceApi(finalState, addData);
      if (data.message === "Success") {

        sendInvoice(finalState, addData);

        allData();
        setFormdata(Data);
        handleClose();
        setIsFormSubmitted(false);
        setAdddata([]);
        setGstamount();
        setTotal();
        setTotalRate(0);
        toast.success("Campaign create successfully!");
      }
    } else {
      setIsFormSubmitted(true);
    }
  };

const sendInvoice = async (finalState,addData) => {
  try {
    const response = await axios.post('http://localhost:3001/invoice', {finalState,addData} , {
      headers: {
        'Content-Type': 'application/json',
      },
    });
   
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


  const getStaff = async () => {
    const value = await getAllStaffApi();
    setStaff(value);
  };

  const getCoustomer = async () => {
    const value = await getCustomerApi();
    setrelatedData(value);
    getStaff();
  };

  useEffect(() => {
    getCoustomer();
  }, []);

  const [allAddress, setAllAddress] = useState(null);

  useEffect(() => {
    const data = relatedData.filter(
      (item) => item.company === formdata.customer
    );
    // Extract the first element as an object from the data array
    const addressObject = data.length > 0 ? data[0] : null;
    setAllAddress(addressObject);
  }, [formdata.customer]);

  return (
    <>
      <addItem />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Invoice</Modal.Title>
        </Modal.Header>
        <form action="" onSubmit={handleSubmit}>
          <ModalBody>
            <div className="filter" style={{ width: "56vw" }}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-lg-12 mt-2">
                      <label htmlFor="" className="control-label">
                        <small className="req text-danger">*</small>Customer
                      </label>
                      <div>
                        <select
                          className={`select-1 ${
                            isFormSubmitted && formdata.customer === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          name="customer"
                          value={formdata.customer}
                          onChange={handleChange}
                        >
                          <option value="" disabled selected></option>
                          {relatedData.map((el) => {
                            return (
                              <option value={el.company}>{el.company}</option>
                            );
                          })}
                        </select>
                        {isFormSubmitted && formdata.customer === "" && (
                          <div className="invalid-feedback">
                            Please select customer.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 mt-2">
                      <small
                        className="req text-primary icon_edit"
                        onClick={handleShow}
                      >
                        <BiEdit />
                      </small>
                      <p className="bill_p">
                        {" "}
                        <small className="req text-danger">*</small>Bill to
                      </p>
                      <address>
                        <span>--</span>
                        <br />
                        <span>--</span>,<span> --</span>
                        <br />
                        <span>--</span>,<span> --</span>
                      </address>
                    </div>
                    <div className="col-lg-6 mt-4">
                      <p className="bill_p">
                        {" "}
                        <small className="req text-danger">*</small>Ship to
                      </p>
                      <address>
                        <span>--</span>
                        <br />
                        <span>--</span>,<span> --</span>
                        <br />
                        <span>--</span>,<span> --</span>
                      </address>
                    </div>
                    <div className="col-lg-12 mt-2">
                      <label htmlFor="" className="control-label">
                        <small className="req text-danger">*</small>Invoice
                        Number
                      </label>
                      <div className="d-flex">
                        <span className="span_ncp">NCP-</span>
                        <input
                          type="number"
                          className={`form-control ${
                            isFormSubmitted && formdata.invoice_number === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          style={{ borderLeft: "none!important" }}
                          name="invoice_number"
                          value={formdata.invoice_number}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 mt-2">
                      <label htmlFor="" className="control-label">
                        <small className="req text-danger">*</small>Invoice Date
                      </label>
                      <input
                        type="date"
                        id="start_date"
                        min={new Date().toISOString().split("T")[0]}
                        name="start_date"
                        className={`form-control ${
                          isFormSubmitted && formdata.start_date === ""
                            ? "is-invalid"
                            : ""
                        }`}
                        autoComplete="off"
                        aria-invalid="false"
                        value={formdata.start_date}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-lg-6 mt-2">
                      <label htmlFor="" className="control-label">
                        <small className="req text-danger">*</small>Due Date
                      </label>
                      <input
                        type="date"
                        id="end_date"
                        name="end_date"
                        min={formdata.start_date}
                        className={`form-control ${
                          isFormSubmitted && formdata.end_date === ""
                            ? "is-invalid"
                            : ""
                        }`}
                        autoComplete="off"
                        aria-invalid="false"
                        value={formdata.end_date}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="row">
                    <div className="col-lg-6 mt-2">
                      <label htmlFor="" className="control-label">
                        <small className="req text-danger">*</small>Currency
                      </label>
                      <div>
                        <select
                          className="select-1"
                          name="currency"
                          value={formdata.currency}
                          onChange={handleChange}
                          disabled={true}
                        >
                          <option value="INR">INR</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6 mt-2">
                      <label htmlFor="" className="control-label">
                        <small className="req text-danger">*</small> Sale Agent
                      </label>
                      <div>
                        <select
                          className={`select-1 ${
                            isFormSubmitted && formdata.sale_agent === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          name="sale_agent"
                          value={formdata.sale_agent}
                          onChange={handleChange}
                        >
                          <option value="" disabled></option>
                          {staff.map((el) => (
                            <option value={el.firstname}>{el.firstname}</option>
                          ))}
                        </select>
                        {isFormSubmitted && formdata.sale_agent === "" && (
                          <div className="invalid-feedback">Please select.</div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 mt-2">
                      <label htmlFor="" className="control-label">
                        <small className="req text-danger">*</small> Recurring
                        Invoice?
                      </label>
                      <div>
                        <select
                          className={`select-1 ${
                            isFormSubmitted && formdata.recurring_invoice === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          name="recurring_invoice"
                          value={formdata.recurring_invoice}
                          onChange={handleChange}
                        >
                          <option value=""></option>
                          <option value="1">Every 1 Month</option>
                          <option value="6">Every 6 Month</option>
                          <option value="12">Every 12 Month</option>
                        </select>
                        {isFormSubmitted &&
                          formdata.recurring_invoice === "" && (
                            <div className="invalid-feedback">
                              Please select.
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-lg-6 mt-2">
                      <label htmlFor="" className="control-label">
                        <small className="req text-danger">*</small> Status
                      </label>
                      <select
                        className={`select-1 ${
                          isFormSubmitted && formdata.status === ""
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formdata.status}
                        onChange={handleChange}
                        name="status"
                      >
                        <option value="New">New</option>
                        <option value="Processing">In Progress</option>
                        <option value="Hold">On Hold</option>
                        <option value="Trashed">Cancelled</option>
                        <option value="Completed">Finished</option>
                        <option value="OPEN">OPEN</option>
                      </select>
                      {isFormSubmitted && formdata.status === "" && (
                        <div className="invalid-feedback">Please select.</div>
                      )}
                    </div>

                    <div className="col-lg-12 mt-2">
                      <label htmlFor="" className="control-label">
                        <small className="req text-danger">*</small>Admin Note
                      </label>
                      <textarea
                        id=""
                        name="admin_note"
                        value={formdata.admin_note}
                        className={`form-control ddd ${
                          isFormSubmitted && formdata.admin_note === ""
                            ? "is-invalid"
                            : ""
                        }`}
                        rows="8"
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="">
                <div className="row">
                  <div className="col-lg-12">
                    <small className="req text-danger">*</small>{" "}
                    <button
                      className={`btn btn-create ${
                        isFormSubmitted && addData.length == 0
                          ? "is-invalid"
                          : ""
                      }`}
                      type="button"
                      onClick={handleShowadd}
                    >
                      Add Item
                    </button>
                    {isFormSubmitted && addData.length == 0 && (
                      <div className="invalid-feedback">
                        Please add atleast 1 item
                      </div>
                    )}
                  </div>
                  <div className="col-lg-12">
                    <MaterialTable
                      data={addData}
                      columns={[
                        {
                          title: "Item Name",
                          field: "Description",
                        },
                        {
                          title: "Qty",
                          field: "Item",
                        },

                        {
                          title: "Unit",
                          field: "unit",
                        },
                        {
                          title: "Rate",
                          field: "Rate",
                        },
                      ]}
                      options={{
                        headerStyle: {
                          backgroundColor: "#caf0ec",
                          color: "#14877c",
                          padding: ".2em .7em",
                          margin: "0px",
                          whiteSpace: "nowrap", // Prevents text from wrapping
                          overflow: "hidden", // Hides any overflowing text
                          textOverflow: "ellipsis", // Truncates the text with an ellipsi
                        },
                        rowStyle: {
                          backgroundColor: "#FFFFFF",
                          fontSize: ".72rem",
                          whiteSpace: "nowrap", // Prevents text from wrapping
                          overflow: "hidden", // Hides any overflowing text
                          textOverflow: "ellipsis", // Truncates the text with an ellipsi
                        },
                      }}
                      title="ALL ITEM"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <table className="table amount_table mt-5">
                    <tbody>
                      <tr>
                        <td></td>
                        <td className="fw-bold">Sub Total :</td>

                        <td className="d-flex fw-bold">
                          <BiRupee style={{ marginTop: "5%" }} />
                          {parseInt(totalRate)}
                        </td>
                      </tr>
                      {/* <tr>
                        <td className="fw-bold">Discount</td>
                        <td className="d-flex">
                          <select
                            disabled={selectedOption === "0"}
                            className="select-1 "
                            value={discountAmount}
                            onChange={DiscountChange}
                          >
                            <option value=""></option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                          </select>
                          <select
                            className="select-1 "
                            style={{ width: "10px" }}
                            value={selectedOption}
                            onChange={handleDropdownChange}
                          >
                            <option value="" disabled></option>
                            <option value="percentage">Discount %</option>
                            <option value="0">fiexd Amount</option>
                          </select>
                        </td>
                        <td>
                          <BiRupee />
                          {parseInt(discountPrice)}
                          {isFormSubmitted && discountPrice === 0 && (
                            <div style={{ fontSize: ".6rem", color: "red" }}>
                              select discount
                            </div>
                          )}
                        </td>
                      </tr> */}

                      <tr>
                        <td></td>
                        <td className="fw-bold">Total GST (18%) :</td>
                        <td className="d-flex fw-bold">
                          <BiRupee style={{ marginTop: "5%" }} />
                          {parseInt(gstAmount)}
                        </td>
                      </tr>

                      <tr>
                        <td></td>
                        <td className="fw-bold">Total :</td>
                        <td className="d-flex fw-bold">
                          <BiRupee style={{ marginTop: "5%" }} />
                          {parseInt(total)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-create" type="submit">
              Save & Email
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      {allAddress && (
        <BillModal
          showbill={showbill}
          handleClosebill={handleClosebill}
          onTransferData={transferBillData}
          allAddress={allAddress}
        />
      )}
      <AddItem
        showadd={showadd}
        handleCloseadd={handleCloseadd}
        onFormSubmit={handleFormSubmit}
        transferAdditem={transferAdditem}
      />
      <style jsx>
        {`
          .container {
            padding: 0px !important;
          }
          .btn-create {
            width: 10vw;
          }
          .customer_status {
            background: #e4e8f1;
            color: #48576a;
            margin-bottom: 0;
            font-size: 12px;
            font-style: normal;
          }
          .select-1 {
            width: 100% !important;
          }
          .ddd {
            height: 80px !important ;
          }
          .bill_p {
            margin-bottom: 0px;
            font-size: 12px;
            font-weight: 500;
          }
          .span_ncp {
            background-color: #fbfdff;
            color: #97a8be;
            padding: 6px 12px;
            font-size: 14px;
            font-weight: 400;
            border: 1px solid #ccc;
            border-radius: 4px;
            line-height: 1;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .span_infinity {
            background-color: #fbfdff;
            color: black;
            padding: 6px 12px;
            font-size: 14px;
            font-weight: 400;
            border: 1px solid #ccc;
            border-radius: 4px;
            line-height: 1;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            justify-content: center;
            align-items: center;
          }
          .span_infinity input {
            margin-right: 4px;
          }
          .icon_edit {
            font-size: 14px !important;
            margin-right: 4px !important;
            cursor: pointer;
          }
          .btn_bank {
            text-align: left;
            background-color: white !important;
            padding: 7px !important;
          }
          .btn_bank span {
            float: right;
          }
          .bank_div {
            padding: 5px;
            box-shadow: 0 1px 7px 2px rgba(135, 158, 171, 0.2);
          }
          .select_btn {
            background-color: white;
            color: black;
            font-size: 12px !important;
          }
          .amount_table {
            width: 40%;
            float: right;
            font-size: 12px;
          }
          .discount_input {
            height: 28px !important;
          }
          .dis_drop {
            width: 30% !important;
            padding: 0px !important;
            height: 28px !important;
            color: #526dce !important;
          }
        `}
      </style>
    </>
  );
};

export default Add_Invoice;
