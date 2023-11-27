import React, { useEffect, useState } from "react";
import SideBar from "../../../components/dashboard_navbar/Sidebar";
import MaterialTable from "@material-table/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Create_landlord from "./create_landlord";
import Edit_landlord from "./edit_landlord";
import { deletLandlordsApi, getAllLandlordsApi } from "../../../apis/apis";
import withAuth from "../../../hoc/withAuth";
import { toast } from "react-toastify";
import { useSelector} from "react-redux";

const Index = () => {
  let emptyData = [];
  const [selectRow, setSelectRow] = useState(null);
  const [allLandlord, setAllLandlord] = useState([]);
  const [staffPermission, setStaffPermission] = useState();
  //modal state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (staffPermission?.can_create == 1) {
      setShow(true);
    } else {
      alert("you don't have permission for this!");
    }
  };

  // Edit media modal
  const [showe, setShowe] = useState(false);
  const handleClosee = () => {
    setShowe(false);
    setSelectRow(null);
  };
  const handleShowe = () => setShowe(true);

  //get all landlord
  const allLanlord = async () => {
    const data = await getAllLandlordsApi();
    setAllLandlord(data);
  };

  //usr permision
  const permissions = useSelector((state) => state.user.userPermissions);
  useEffect(() => {
    if (permissions.length >= 1) {
      const staff = permissions.filter((media) => media.short_name === "landlord_management");
      setStaffPermission({ ...staff[0] });
    }
  }, [permissions]);
  useEffect(() => {

    allLanlord();
  }, []);

  return (
    <>
      <div className="containers">
        <div className="container-sidebar">
          <SideBar />
        </div>
        <div className="container-pages">
          <div className=" main_container">
            <div className="row ">
              <div className="col-lg-12 ">
                <button
                  type="button"
                  className="btn btn-create"
                  onClick={handleShow}
                >
                  ADD LANDLORD
                </button>
              </div>
            </div>
            <hr />
            <div className="row customer_rev">
              <div className="col-lg-12">
                <h4>Customers Summary</h4>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>{allLandlord.length}</h3>
                <span>Total Landlords</span>
              </div>
              {/* <div className="col-lg-2 margin_right">
                <h3>0</h3>
                <span style={{ color: "#b8ca29" }}>Total Active Landlords</span>
              </div>
              <div className="col-lg-3 margin_right">
                <h3>0</h3>
                <span style={{ color: "#fc4748" }}>
                  Total Inactive Landlords
                </span>
              </div> */}
            </div>
            <hr />
            <MaterialTable
              data={staffPermission?.can_view == 1 ? allLandlord : emptyData}
              columns={[
                { title: "Name", field: "name" },
                { title: "Email", field: "email" },
                { title: "Phone", field: "phone" },
                { title: "Address", field: "address" },
                { title: "State", field: "state" },
                { title: "City", field: "city" },
                {
                  title: "Actions",
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
                            const confirmed = window.confirm("Are you sure?");

                            // Check if the user clicked "Confirm"
                            if (confirmed) {
                              // Call the deletMedia() function
                              deletLandlordsApi(rowData.id);
                              allLanlord();
                              toast.success("Deleted successfully!");
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
                { title: "Postal code", field: "zip" },
              ]}
              options={{
                headerStyle: {
                  backgroundColor: "#f6f8fa",
                  color: "#4e75ad",
                  whiteSpace: "nowrap", // Prevents text from wrapping
                  overflow: "hidden", // Hides any overflowing text
                  textOverflow: "ellipsis", // Truncates the text with an ellipsi
                },
                rowStyle: {
                  backgroundColor: "#FFFFFF",
                  fontSize: ".72rem",
                  margin: "0px",
                  whiteSpace: "nowrap", // Prevents text from wrapping
                  overflow: "hidden", // Hides any overflowing text
                  textOverflow: "ellipsis", // Truncates the text with an ellipsi
                },
              }}
              title="ALL LANDLORD"
            />
          </div>
        </div>
      </div>
      <Create_landlord
        show={show}
        handleClose={handleClose}
        allLanlord={allLanlord}
      />

      {selectRow && (
        <Edit_landlord
          rowData={selectRow}
          show={showe}
          handleClose={handleClosee}
          allLanlord={allLanlord}
        />
      )}
      <style jsx>
        {`
          .containers {
            height: 100vh;

            display: flex;
            // color: #626262;
          }
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
        `}
      </style>
    </>
  );
};

export default withAuth(Index);
