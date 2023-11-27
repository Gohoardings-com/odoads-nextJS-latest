import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import Creat_invoive from "./CreateInvoice";
import SideBar from "../../../components/dashboard_navbar/Sidebar";
import { deleteInvoice, getInvoices } from "../../../apis/apis";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Update_invoice from "./editInvoice";
import withAuth from "@/hoc/withAuth";
import { toast } from "react-toastify";
import { useSelector} from "react-redux";

const Clients = () => {
  let emptyData = [];
  const [tableData, setTableData] = useState([]);
  const [selectRow, setSelectRow] = useState(null);
  const [staffPermission, setStaffPermission] = useState();
  // Create lead modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (staffPermission?.can_create == 1) {
      setShow(true);
    } else {
      alert("you don't have permission for this!");
    }
  };

  // Edit lead modal
  const [showe, setShowe] = useState(false);
  const handleClosee = () => {
    setShowe(false);
    setSelectRow(null);
  };
  const handleShowe = () => setShowe(true);

  const allData = async () => {
    const data = await getInvoices();
    setTableData(data);
  };

 
  //usr permision
  const permissions = useSelector((state) => state.user.userPermissions);

  useEffect(() => {
    if (permissions.length >= 1) {
      const staff = permissions.filter(
        (media) => media.short_name === "invoices"
      );
      setStaffPermission({ ...staff[0] });
    }
  }, [permissions]);

  useEffect(() => {
    allData();
  }, []);

  return (
    <>
      <div className="containers">
        <div className="container-sidebar">
          <SideBar />
        </div>
        <div className="container-pages ">
          <div className=" main_container">
            <div className="row ">
              <div className="col-lg-12 ">
                <button
                  type="button"
                  className="btn btn-create"
                  onClick={handleShow}
                >
                  CREATE NEW INVOICE
                </button>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-lg-12">
                <MaterialTable
                  data={staffPermission?.can_view == 1 ? tableData : emptyData}
                  columns={[
                    {
                      title: "Invoice",
                      field: "Invoice",
                      render: (rowdata) =>
                        ` ${rowdata.prefix} ${rowdata.number}`,
                    },
                    { title: "Amount", field: "total" },
                    { title: "GSTIN", field: "gst" },
                    { title: "Date", field: "duedate" },
                    { title: "Customer", field: "name" },
                    { title: "Status", field: "status" },
                    { title: "Due Date", field: "duedate" },
                    {
                      title: "All Actions",
                      render: (rowData) => (
                        <div>
                          <IconButton
                            aria-label="edit"
                            onClick={() => {
                              if (staffPermission?.can_edit == 1) {
                                setSelectRow(rowData);
                                handleShowe();
                              } else {
                                alert("you don't have permission for this!");
                              }
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => {
                              // Handle delete action here
                              if (staffPermission?.can_delete == 1) {
                                // Display a confirmation dialog
                                const confirmed =
                                  window.confirm("Are you sure?");
                                // Check if the user clicked "Confirm"
                                if (confirmed) {
                                  // Call the deleteMedia()
                                  deleteInvoice(rowData.id);
                                  allData();
                                  toast.success(
                                    "Invoice deleted successfully!"
                                  );
                                }
                              } else {
                                alert("you don't have permission for this!");
                              }
                            }}
                            style={{ color: "#FC2D42" }} // Add the desired color here
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      ),
                    },
                    { title: "Sale agent", field: "sale_agent" },
                    // { title: "Campaign", field: "Campaign" },
                    { title: "Total Tax", field: "total_tax" },
                    // { title: "PO", field: "PO" },

                    // { title: "PAN", field: "pan" },
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
                  title="Invoices"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Creat_invoive show={show} handleClose={handleClose} allData={allData} />
      {selectRow && (
        <Update_invoice
          show={showe}
          handleClose={handleClosee}
          allData={allData}
          selectRow={selectRow}
        />
      )}
      <style jsx>
        {`
          .container-pages {
            margin: 70px 0 0 0;
            height: fit-content;

            width: 100%;

            padding: 20px 30px;
          }
          .main_container {
            background: #fff;
            border: 1px solid #dce1ef;
            border-radius: 4px;
            padding: 20px;
            position: relative;
          }
        `}
      </style>
    </>
  );
};

export default withAuth(Clients);
