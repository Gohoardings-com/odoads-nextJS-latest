import React, { useEffect, useState } from "react";
import SideBar from "../../../components/dashboard_navbar/Sidebar";
import MaterialTable from "@material-table/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { allTasksApi, deletTasksApi } from "../../../apis/apis";
import Creat_task from "./creat_task";
import Edit_task from "./edit_task";
import withAuth from "../../../hoc/withAuth";
import { toast } from "react-toastify";
import { useSelector} from "react-redux";

const Index = () => {
  let emptyData = [];
  const [tableview, setTableview] = useState(true);
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
  // creat media modal
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

  //all tak api
  const getAllTask = async () => {
    const data = await allTasksApi();

    const process = data.filter(
      (media) => media.status === "Processing"
    ).length;
    const New = data.filter((media) => media.status === "New").length;
    const Hold = data.filter((media) => media.status === "Hold").length;
    const Trashed = data.filter((media) => media.status === "Trashed").length;
    const Completed = data.filter(
      (media) => media.status === "Completed"
    ).length;
    const OPEN = data.filter((media) => media.status === "OPEN").length;
    setPosts(data);
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
      const staff = permissions.filter((media) => media.short_name === "tasks");
      setStaffPermission({ ...staff[0] });
    }
  }, [permissions]);

  useEffect(() => {
    getAllTask();
  }, []);

  return (
    <>
      <div className="containers">
        <div className="container-sidebar">
          <SideBar />
        </div>
        <div className="container-pages">
          <div className="main_container">
            <div className="row">
              <div className="col-lg-12 ">
                <button
                  type="button"
                  className="btn btn-create"
                  onClick={handleShow}
                >
                  New Task
                </button>
              </div>
            </div>
            <hr />
            {tableview && (
              <div>
                <div className="row customer_rev">
                  <div className="col-lg-12">
                    <h4>Task Summary</h4>
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
                <MaterialTable
                  data={staffPermission?.can_view == 1 ? posts : emptyData}
                  columns={[
                    { title: "Name", field: "name" },
                    {
                      title: "Related to",
                      field: "related_type",
                      render: (rowData) =>
                        ` ${rowData.related_type}>${rowData.assign}`,
                    },
                    { title: "Status", field: "status" },
                    {
                      title: "Start Date",
                      render: (rowData) => {
                        const date = new Date(rowData.startdate);
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
                      title: "Due Date",
                      render: (rowData) => {
                        const date = new Date(rowData.duedate);
                        const year = date.getFullYear();
                        const month = date.getMonth() + 1;
                        const day = date.getDate();
                        const formattedDate = `${day < 10 ? "0" + day : day}/${
                          month < 10 ? "0" + month : month
                        }/${year}`;

                        return formattedDate;
                      },
                    },

                    { title: "Priority", field: "priorities" },
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
                                const confirmed =
                                  window.confirm("Are you sure?");

                                // Check if the user clicked "Confirm"
                                if (confirmed) {
                                  // Call the delet function
                                  deletTasksApi(rowData.id);
                                  toast.success("Deleted successfully!");
                                  getAllTask();
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
                      margin: "0px",
                      whiteSpace: "nowrap", // Prevents text from wrapping
                      overflow: "hidden", // Hides any overflowing text
                      textOverflow: "ellipsis", // Truncates the text with an ellipsi
                    },
                  }}
                  title="ALL TASK"
                />
              </div>
            )}
            <Creat_task
              show={show}
              handleClose={handleClose}
              getAllTask={getAllTask}
            />
            {selectRow && (
              <Edit_task
                show={showe}
                handleClose={handleClosee}
                selectRow={selectRow}
                getAllTask={getAllTask}
              />
            )}
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .main_container {
            background: #fff;
            border: 1px solid #dce1ef;
            border-radius: 4px;
            padding: 20px;
            position: relative;
          }
          .customer_rev {
            color: #323a45;
            margin-bottom: 4vw;
          }
          h3 {
            margin-top: 8px;
            margin-bottom: 10px;
            font-size: 20px;
          }
          h4 {
            font-size: 18px;
            font-weight: 400;
          }
          .margin_right {
            border-right: 1px solid #f0f0f0;
          }
          .margin_right p {
            font-size: 15px !important;
            margin-bottom: 3px;
          }
          span {
            font-size: 12px;
            font-weight: 400;
          }

          .div_header {
            background: #989898;
            border-color: #989898;
            color: #fff;
            padding: 12px;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
            position: relative;
            border-bottom: 1px solid #e4e5e7;
          }
          .div_header h6 {
            font-size: 14px;
            margin: 0px;
            padding: 0px;
          }
          .img_header {
            width: 38px;
            height: 43px;
            position: absolute;
            top: 0px;
            right: 1px;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            z-index: 39;
          }

          .content_div {
            min-height: 205px;
            background: #e3e8ee;
            padding: 7px;
          }
          .task_div {
            margin-bottom: 1vw;
          }
          .status_tag {
            background: #f2dede !important;
            border: 1px solid #eab8b7 !important;
            border-radius: 4px;
            padding: 10px;
            text-align: left;
            color: #2b8db9;
            margin-bottom: 10px;
          }
          .list_icon {
            margin-right: 7px !important;
          }
        `}
      </style>
    </>
  );
};

export default withAuth(Index);
