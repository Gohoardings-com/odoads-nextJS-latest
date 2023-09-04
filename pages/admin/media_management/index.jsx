import React, { useState, useEffect } from "react";
import SideBar from "../../../components/dashboard_navbar/Sidebar";
import {getMediasApi } from "../../../apis/apis";
import MaterialTable from "@material-table/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Create_medias from "./create_medias";
import Edit_media from "./edit_medias";
import withAuth from "../../../hoc/withAuth";
import Filters from "@/components/main-filter";
import { useSelector} from "react-redux";

const Index = () => {
  let emptyData = [];
  const [selectRow, setSelectRow] = useState(null);
  const [medias, setMedias] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [city, setCity] = useState([]);
  const [bookedMedia, setBookedMedia] = useState();
  const [blockMedia, setblockMedia] = useState();
  const [mediaCategory, setMediaCategory] = useState([]);
  const [staffPermission, setStaffPermission] = useState();
  // creat media modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () =>{
    if (staffPermission?.can_create == 1) {
      setShow(true);
    } else {
      alert("you don't have permission for this!");
    }
  }

  // Edit media modal
  const [showe, setShowe] = useState(false);
  const handleClosee = () => {
    setShowe(false);
    setSelectRow(null);
  };

  const handleShowe = () => setShowe(true);

  //Get all media
  const allMedia = async () => {
    const data = await getMediasApi();
    setMedias(data);
    setFilteredMedia(data);
    const m_category = [...new Set(data.map((item) => item.category))];
    const m_city = [...new Set(data.map((item) => item.city))];
    const bookedMediaLength = data.filter((media) => media.booked === 1).length;
    const blockMediaLength = data.filter((media) => media.block === 1).length;

    setBookedMedia(bookedMediaLength);
    setblockMedia(blockMediaLength);
    setMediaCategory(m_category);
    setCity(m_city);
  };

   //usr permision
   const permissions = useSelector((state) => state.user.userPermissions);
  
   useEffect(() => {
     if (permissions.length >= 1) {
       const staff = permissions.filter((media) => media.short_name === "media_inventory");
       setStaffPermission({ ...staff[0]});
     }
   }, [permissions]);

  useEffect(() => {
    allMedia();
  }, []);

  return (
    <>
      <div className="containers">
        {/* Sidebar component */}
        <div className="container-sidebar">
          <SideBar />
        </div>
        <div className="container-pages">
          <div className="task-panel">
            <button className="btn btn-create " onClick={handleShow}>
              ADD MEDIA
            </button>
            <hr />
            <div className="row mb-md-3">
              <div className="col-md-2  border-right">
                <h4 className="bold" id="custotalmedia">
                  {medias.length}
                </h4>
                <span style={{ color: "#464646" }}>Total Media</span>
              </div>
              <div className="col-md-2  border-right">
                <h4 className="bold">
                  {medias.length - (bookedMedia + blockMedia)}
                </h4>
                <span style={{ color: "#464646" }}>Total Available Media</span>
              </div>
              <div className="col-md-2  border-right">
                <h4 className="bold">{bookedMedia}</h4>
                <span style={{ color: "#84c529" }}>Total Booked Media</span>
              </div>
              <div className="col-md-2  border-right">
                <h4 className="bold">{blockMedia}</h4>
                <span style={{ color: "#fc2d42" }}>Total Blocked Media</span>
              </div>
            </div>
            <Filters
              medias={medias}
              city={city}
              setFilteredMedia={setFilteredMedia}
              mediaCategory={mediaCategory}
            />
            <div className="my-md-4">
              <MaterialTable
                data={staffPermission?.can_view == 1 ? filteredMedia : emptyData}
                columns={[
                  {
                    title: "Image",
                    field: "thumbnail",
                    render: (rowData) => (
                      <img
                        src={rowData.thumbnail}
                        alt="Media Thumbnail"
                        style={{ width: 60, height: 55 }}
                      />
                    ),
                  },
                  {
                    title: "Location",
                    field: "state",
                    render: (rowData) => ` ${rowData.city},${rowData.state}`,
                  },
                  {
                    title: "Category",
                    field: "category",
                    render: (rowData) =>
                      ` ${rowData.category}>>${rowData.subcategory}`,
                  },
                  {
                    title: "Available Date",
                    field: "allocate_start_date",
                    render: (rowData) => {
                      const date = new Date(rowData.available_date);
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
                    title: "GEO Location",
                    field: "geolocation",
                  },
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
                        {/* <IconButton
                          aria-label="delete"
                          onClick={() => {
                            // Handle delete action here

                            // Display a confirmation dialog
                            const confirmed = window.confirm("Are you sure?");

                            // Check if the user clicked "Confirm"
                            if (confirmed) {
                              // Call the deletMedia() function
                              deletMediasApi(rowData.id);
                              allMedia();
                              toast.success("Media deleted successfully!");
                            }
                          }}
                          style={{ color: "#FC2D42" }} // Add the desired color here
                        >
                          <DeleteIcon />
                        </IconButton> */}
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
                title="YOUR MEDIAS"
              />
            </div>
          </div>
        </div>
      </div>
      <Create_medias
        show={show}
        handleClose={handleClose}
        allMedia={allMedia}
      />
      {selectRow && (
        <Edit_media
          rowData={selectRow}
          show={showe}
          allMedia={allMedia}
          handleClose={handleClosee}
        />
      )}
      <style jsx>
        {`
          span {
            font-size: 0.8rem !important;
          }
        `}
      </style>
    </>
  );
};

export default withAuth(Index);
