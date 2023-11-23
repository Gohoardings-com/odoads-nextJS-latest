import React, { useEffect, useState } from "react";
import SideBar from "../../../components/dashboard_navbar/Sidebar";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MaterialTable from "@material-table/core";
import { deletCampaignApi, getAllCampaignApi } from "../../../apis/apis";
import Creat_campaign from "./creat_campaign";
import Edit_campaign from "./edit_campaign";
import withAuth from "../../../hoc/withAuth";
import { toast } from "react-toastify";
import { useSelector} from "react-redux";

const Index = () => {
  let emptyData = [];
  const [posts, setPosts] = useState([]);
  const [selectRow, setSelectRow] = useState(null);
  const [campaignData, setCampaignData] = useState({
    process: 0,
    New: 0,
    Hold: 0,
    Trashed: 0,
    Completed: 0,
    OPEN: 0,
  });
  const [staffPermission, setStaffPermission] = useState();
  //creat modal
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
    const allData = await getAllCampaignApi();

    const process = allData.filter(
      (media) => media.status === "Processing"
    ).length;
    const New = allData.filter((media) => media.status === "New").length;
    const Hold = allData.filter((media) => media.status === "Hold").length;
    const Trashed = allData.filter(
      (media) => media.status === "Trashed"
    ).length;
    const Completed = allData.filter(
      (media) => media.status === "Completed"
    ).length;
    const OPEN = allData.filter((media) => media.status === "OPEN").length;
    setPosts(allData);
    setCampaignData({
      process,
      New,
      Hold,
      Trashed,
      Completed,
      OPEN,
    });
  };

  //usr permision
  const permissions = useSelector((state) => state.user.userPermissions);

  useEffect(() => {
    if (permissions.length >= 1) {
      const staff = permissions.filter((media) => media.short_name === "campaigns");
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
                  NEW CAMPAIGN
                </button>
              </div>
            </div>
            <hr />
            <div className="row customer_rev">
              <div className="col-lg-12">
                <h4>Campaing Summary</h4>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>{campaignData.New}</h3>
                <span>New</span>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>{campaignData.OPEN}</h3>
                <span style={{ color: "rgb(82 193 12)" }}>Open</span>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>{campaignData.process}</h3>
                <span style={{ color: "#b8ca29" }}>Processing</span>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>{campaignData.Hold}</h3>
                <span style={{ color: "#4e52b7" }}>On Hold</span>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>{campaignData.Trashed}</h3>
                <span style={{ color: "#fc4748" }}>Cancelled</span>
              </div>
              <div className="col-lg-2 margin_right">
                <h3>{campaignData.Completed}</h3>
                <span style={{ color: "green" }}>Finished</span>
              </div>
            </div>
            <hr />

            <div className="row">
              <MaterialTable
                data={staffPermission?.can_view == 1 ? posts : emptyData}
                columns={[
                  { title: "Campaign name", field: "name" },
                  { title: "Coustomer", field: "customer" },
                  {
                    title: "Start date",
                    render: (rowData) => {
                      const date = new Date(rowData.start_date);
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
                    title: "Deadline",
                    render: (rowData) => {
                      const date = new Date(rowData.deadline);
                      const year = date.getFullYear();
                      const month = date.getMonth() + 1;
                      const day = date.getDate();
                      const formattedDate = `${day < 10 ? "0" + day : day}/${
                        month < 10 ? "0" + month : month
                      }/${year}`;

                      return formattedDate;
                    },
                  },
                  { title: "Status", field: "status" },
                  { title: "Purchase Order(PO)", field: "purchase_order" },
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
                              const confirmed = window.confirm("Are you sure?");

                              // Check if the user clicked "Confirm"
                              if (confirmed) {
                                // Call the deletMedia() function
                                deletCampaignApi(rowData.id);
                                getData();
                                toast.success("Campaign deleted successfully!");
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
                  },
                }}
                title=""
              />
            </div>
          </div>
        </div>
      </div>

      <Creat_campaign
        show={show}
        handleClose={handleClose}
        getAllCampaign={getData}
      />
      {selectRow && (
        <Edit_campaign
          show={showe}
          handleClose={handleClosee}
          selectRow={selectRow}
          getAllCampaign={getData}
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
