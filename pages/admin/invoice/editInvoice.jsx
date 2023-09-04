import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ModalBody, ModalFooter } from "react-bootstrap";
import { BiEdit, BiRupee } from "react-icons/bi";
import MaterialTable from "@material-table/core";
import { toast } from "react-toastify";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  getAllStaffApi,
  getCustomerApi,
  invoicesItemApi,
  updateInvoice,
} from "../../../apis/apis";
import Edit_BillModal from "./editBill";
import EditItem from "./editItem";

const Update_invoice = ({ show, handleClose, allData, selectRow }) => {
  const [finalState, setFinalstate] = useState({});
  const [singleItem, setsSingleItem] = useState(null);
  const [billData, setBillData] = useState([]);
  const [formdata, setFormdata] = useState(selectRow);
  const [staff, setStaff] = useState([]);
  const [addData, setAdddata] = useState([]);
  const [totalRate, setTotalRate] = useState(0);
  const [total, setTotal] = useState(0);
  const [gstAmount, setGstamount] = useState(0);
  const [relatedData, setrelatedData] = useState([]);
  const [discountAmount, setDiscountamount] = useState(0);
  const [amount, setAmount] = useState({});

  const [showe, setShowe] = useState(false);
  const handleClosee = () => {
    setShowe(false);
    setsSingleItem([]);
  };
  const handleShowe = () => setShowe(true);

  const transferBillData = (FormData) => {
    setBillData(FormData);
  };

  // bill modal
  const [showbill, setShowbill] = useState(false);
  const handleClosebill = () => setShowbill(false);
  const handleShow = () => {
    setShowbill(true);
  };

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const allItems = async () => {
    const getId = formdata.id;
    const data = await invoicesItemApi(getId);
    const Gst = 18;

    const sub_total = data.reduce(
      (sum, item) => sum + item.rate * item.qty, // Modify the calculation here
      0 // Initialize sum to 0
    );
    const gstamount = (sub_total * Gst) / 100;
    const GrandTotal = sub_total + gstamount;
    setGstamount(gstamount);
    setTotal(GrandTotal);
    setTotalRate(sub_total);
    setAdddata(data);
  };

  const mergeAmount = () => {
    setAmount({
      ...amount,
      sub_total: totalRate,
      grand_total: total,
      gst: gstAmount,
      discount: discountAmount,
    });
  };

  useEffect(() => {
    mergeAmount();
  }, [totalRate, total, gstAmount]);
  //marge all state
  const mergeStates = () => {
    setFinalstate({
      ...finalState,
      invoice: formdata,
      amount: amount,
    });
  };

  useEffect(() => {
    mergeStates();
  }, [billData, formdata, addData, amount]);

  //update invoice api
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await updateInvoice(finalState);
    if (data.message == "Success") {
      allData();
      allItems();
      handleClose();

      toast.success("Invoice updated successfully!");
    }
  };

  const getUserS = async () => {
    const value = await getCustomerApi();
    setrelatedData(value);
    getStaff();
  };

  const getStaff = async () => {
    const value = await getAllStaffApi();
    setStaff(value);
    allItems();
  };

  useEffect(() => {
    getUserS();
  }, [formdata]);

  return (
    <>
      <addItem />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Invoice</Modal.Title>
        </Modal.Header>
        {formdata && (
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
                            className="select-1"
                            name="name"
                            value={formdata.name}
                            onChange={handleChange}
                          >
                            <option value="" disabled selected hidden>
                              Nothing Selected
                            </option>
                            {relatedData.map((el) => {
                              return (
                                <option value={el.company}>{el.company}</option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 mt-2">
                        <small
                          className="req text-primary icon_edit"
                          onClick={handleShow}
                        >
                          <BiEdit />
                        </small>
                        <p className="bill_p">Bill to</p>
                        <address>
                          <span>--</span>
                          <br />
                          <span>--</span>,<span> --</span>
                          <br />
                          <span>--</span>,<span> --</span>
                        </address>
                      </div>
                      <div className="col-lg-6 mt-4">
                        <p className="bill_p">Ship to</p>
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
                            className="form-control"
                            style={{ borderLeft: "none!important" }}
                            placeholder="Invoice number"
                            name="number"
                            value={formdata.number}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 mt-2">
                        <label htmlFor="" className="control-label">
                          <small className="req text-danger">*</small>Invoice
                          Date
                        </label>
                        <input
                          type="date"
                          id="start_date"
                          name="date"
                          className="form-control"
                          autoComplete="off"
                          aria-invalid="false"
                          value={formdata.date}
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
                          name="duedate"
                          className="form-control"
                          autoComplete="off"
                          aria-invalid="false"
                          value={formdata.duedate}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
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
                          >
                            <option value="INR">INR</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 mt-2">
                        <label htmlFor="" className="control-label">
                          Sale Agent
                        </label>
                        <div>
                          <select
                            className="select-1"
                            name="sale_agent"
                            value={formdata.sale_agent}
                            onChange={handleChange}
                          >
                            <option value="" disabled>
                              Nothing Selected
                            </option>
                            {staff.map((el) => (
                              <option value={el.firstname}>
                                {el.firstname}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 mt-2">
                        <label htmlFor="" className="control-label">
                          Recurring Invoice?
                        </label>
                        <div>
                          <select
                            className="select-1"
                            name="recurring"
                            value={formdata.recurring}
                            onChange={handleChange}
                          >
                            <option value="" disabled selected hidden>
                              Nothing Selected
                            </option>
                            <option value="" disabled>
                              No
                            </option>
                            <option value="1">Every 1 Month</option>
                            <option value="6">Every 6 Month</option>
                            <option value="12">Every 12 Month</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 mt-2">
                        <label htmlFor="" className="control-label">
                          Status
                        </label>
                        <select
                          className={`select-1`}
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
                      </div>
                      {/* <div className="col-lg-12 mt-2">
                        <label htmlFor="" className="control-label">
                          Total Cycles
                        </label>
                        <div className="d-flex">
                          <input
                            type="number"
                            name="total_cycles"
                            className="form-control"
                            value={formdata.total_cycles}
                            onChange={handleChange}
                            style={{ borderLeft: "none!important" }}
                          />
                          <span className="span_infinity d-flex">
                            <input
                              type="checkbox"
                              disabled={true}
                              onChange={handleCheckboxChange}
                            />
                            infinity
                          </span>
                        </div>
                      </div> */}
                      <div className="col-lg-12 mt-2">
                        <label htmlFor="" className="control-label">
                          Admin Note
                        </label>
                        <textarea
                          id=""
                          name="adminnote"
                          value={formdata.adminnote}
                          className="form-control ddd"
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
                      <MaterialTable
                        data={addData}
                        columns={[
                          {
                            title: "Item",
                            field: "description",
                            cellStyle: { color: "#412cd3", fontSize: "11.5px" },
                          },

                          {
                            title: "Qty",
                            field: "qty",
                          },
                          {
                            title: "Unit",
                            field: "unit",
                          },
                          {
                            title: "Rate",
                            field: "rate",
                          },

                          {
                            title: "All Actions",
                            render: (rowData) => (
                              <div>
                                <IconButton
                                  aria-label="edit"
                                  onClick={() => {
                                    // Handle edit action here
                                    setsSingleItem(rowData);
                                    handleShowe();
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => {
                                    // Handle delete action here

                                    // Display a confirmation dialog
                                    const confirmed =
                                      window.confirm("Are you sure?");

                                    // Check if the user clicked "Confirm"
                                    if (confirmed) {
                                      // Call the deleteMedia()
                                      // allData();
                                    }
                                  }}
                                  style={{ color: "#FC2D42" }} // Add the desired color here
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </div>
                            ),
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
                        title="ALL ITEMS"
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
        )}
      </Modal>

      {selectRow && (
        <Edit_BillModal
          showbill={showbill}
          handleClosebill={handleClosebill}
          onTransferData={transferBillData}
          selectRow={selectRow}
          allData={allData}
        />
      )}
      {singleItem && (
        <EditItem
          handleClosee={handleClosee}
          singleItem={singleItem}
          showe={showe}
          allData={allItems}
        />
      )}
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
            height: 17vh !important ;
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

export default Update_invoice;
