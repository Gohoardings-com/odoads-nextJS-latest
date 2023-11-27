import React, { useEffect, useState } from "react";
import SideBar from "../../../components/dashboard_navbar/Sidebar";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MaterialTable from "@material-table/core";
import Add_customer from "./add_coustomer";
import { toast } from "react-toastify";
import { deleteCustomerApi, getCustomerApi } from "../../../apis/apis";
import Edit_customer from "./edit_coustomer";
import withAuth from "../../../hoc/withAuth";
import { useSelector } from "react-redux";

const Index = () => {
  let emptyData = [];
  const [posts, setPosts] = useState([]);
  const [selectRow, setSelectRow] = useState(null);
  const [staffPermission, setStaffPermission] = useState();
  //create modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (staffPermission?.can_create == 1) {
      setShow(true);
    } else {
      alert("you don't have permission for this!");
    }
  };
  // Edit modal
  const [showe, setShowe] = useState(false);
  const handleClosee = () => {
    setShowe(false);
    setSelectRow(null);
  };
  const handleShowe = () => setShowe(true);

  const getData = async () => {
    const allData = await getCustomerApi();
    setPosts(allData);
  };

  //usr permision
  const permissions = useSelector((state) => state.user.userPermissions);

  useEffect(() => {
    if (permissions.length >= 1) {
      const staff = permissions.filter(
        (media) => media.short_name === "customers"
      );
      setStaffPermission({ ...staff[0] });
    }
  }, [permissions]);

  useEffect(() => {
    getData();
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
                  NEW CUSTOMER
                </button>
              </div>
            </div>
            <hr />
            <div className="row customer_rev">
              <div className="col-lg-12">
                <h4>Customers Summary</h4>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>{posts.length}</h3>
                <span>Total Customer</span>
              </div>
              {/* <div className="col-lg-2 margin_right">
                <h3>2</h3>
                <span style={{ color: "#b8ca29" }}>Active Customers</span>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>0</h3>
                <span style={{ color: "#fc4748" }}>Inactive Customers</span>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>4</h3>
                <span style={{ color: "#4e52b7" }}>Active Contacts</span>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>0</h3>
                <span style={{ color: "#fc4748" }}>Inactive Contacts</span>
              </div>
              <div className="col-lg-2 ">
                <h3>2</h3>
                <span style={{ color: "#777777" }}>
                  Contacts Logged In Today
                </span>
              </div> */}
            </div>
            <hr />
            <div className="row">
              <div className="row">
                <MaterialTable
                  data={staffPermission?.can_view == 1 ? posts : emptyData}
                  columns={[
                    { title: "company", field: "company" },
                    { title: "city", field: "city" },
                    { title: "Phone", field: "phonenumber" },
                    { title: "zip", field: "zip" },
                    { title: "state", field: "state" },
                    { title: "address", field: "address" },
                    {
                      title: "Data Created",
                      render: (rowData) => {
                        const date = new Date(rowData.dateCreated);
                        const year = date.getFullYear();
                        const month = date.getMonth() + 1;
                        const day = date.getDate();
                        const formattedDate = `${day < 10 ? "0" + day : day}/${
                          month < 10 ? "0" + month : month
                        }/${year}`;

                        return formattedDate;
                      },
                    },
                    {
                      title: "All Actions",
                      render: (rowData) => (
                        <div>
                          <IconButton
                            aria-label="edit"
                            onClick={() => {
                              // Handle edit action here
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
                                  // Call the deletMedia() function
                                  deleteCustomerApi(rowData.id);
                                  getData();
                                  toast.success(
                                    "Coustomer deleted successfully!"
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
                    { title: "website", field: "website" },
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
                    },
                  }}
                  title="ALL CUSTOMER"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Add_customer show={show} handleClose={handleClose} getData={getData} />
      {selectRow && (
        <Edit_customer
          show={showe}
          handleClose={handleClosee}
          selectRow={selectRow}
          getData={getData}
        />
      )}
      <style jsx>
        {`
          .main_container {
            background: #fff;
            border: 1px solid #dce1ef;
            border-radius: 4px;
            padding: 20px;
            position: relative;
          }

          .margin_right {
            border-right: 1px solid #f0f0f0;
          }
          span {
            font-size: 13px;
            font-weight: 400;
          }
          .customer_rev {
            color: #323a45;
          }
          h3 {
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 20px;
          }
          h4 {
            font-size: 18px;
            font-weight: 400;
          }
          .lable {
            margin-left: 7px;
            font-size: 14px;
          }
          .select_number {
            padding: 3px 12px 2px 12px;
            color: #4e75ad;
            font-size: 13px;
            border-radius: 4px;
            border-color: #4e75ad;
          }
        `}
      </style>
    </>
  );
};

export default withAuth(Index);
