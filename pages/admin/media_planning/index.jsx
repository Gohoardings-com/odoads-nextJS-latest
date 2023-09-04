import React, { useState, useEffect } from "react";
import SideBar from "../../../components/dashboard_navbar/Sidebar";
import { blockkMediaApi, getMediasApi, createPPTApi } from "../../../apis/apis";
import Wishlist from "./wishlist";
import withAuth from "../../../hoc/withAuth";
import Filters from "@/components/main-filter";
import { toast } from "react-toastify";
import { useSelector} from "react-redux";


const Index = () => {
  const [updt, setUpdt] = useState(false);
  const [medias, setMedias] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [city, setCity] = useState([]);
  const [bookedMedia, setBookedMedia] = useState();
  const [blockMedia, setblockMedia] = useState();
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [cardCheckboxes, setCardCheckboxes] = useState([]);
  const [checkedCardData, setCheckedCardData] = useState([]);
  const [mediaCategory, setMediaCategory] = useState([]);
  const [staffPermission, setStaffPermission] = useState();

  // creat media modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (staffPermission?.can_edit == 1) {
      setShow(true);
    } else {
      alert("you don't have permission for this!");
    }
  };

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

  useEffect(() => {
    allMedia();
  }, [updt]);
 
   //usr permision
   const permissions = useSelector((state) => state.user.userPermissions);
  
   useEffect(() => {
     if (permissions.length >= 1) {
       const staff = permissions.filter((media) => media.short_name === "plan_block_book");
       setStaffPermission({ ...staff[0]});
     }
   }, [permissions]);

  const handleSelectAllChange = () => {
    const newSelectAllChecked = !selectAllChecked;
    setSelectAllChecked(newSelectAllChecked);

    if (newSelectAllChecked) {
      const newCardCheckboxes = filteredMedia.map((response) => response.id);
      setCardCheckboxes(newCardCheckboxes);
      setCheckedCardData(filteredMedia);
    } else {
      setCardCheckboxes([]);
      setCheckedCardData([]);
    }
  };

  const excel = async (e) => {
    try {
      // Make a request to the server to download the file
      let response;
      await fetch(`http://localhost:3000/api/excel`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ID: 584, data: checkedCardData }),
        credentials: "include",
      })
        .then((data) => {
          response = data;
        })
        .catch((err) => {
          toast(err.message);
        });
      const blob = await response.blob();

      // Create a new Blob object that represents the file
      const file = new Blob([blob], { type: "application/octet-stream" });

      // Create an anchor element
      const a = document.createElement("a");

      // Set the "download" attribute
      a.setAttribute("download", "Plan.xlsx");

      // Set the "href" attribute to the Blob object
      a.href = URL.createObjectURL(file);

      // Trigger the download
      a.click();
    } catch (err) {
      return false;
    }
  };

  const powerpoint = async (e) => {
    try {
      // Make a request to the server to download the file
      let response;
      await fetch(`http://localhost:3000/api/ppt`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ID: 584, data: checkedCardData }),
        credentials: "include",
      }).then((data) => {
        response = data;
      });

      const blob = await response.blob();

      // Create a new Blob object that represents the file
      const file = new Blob([blob], { type: "application/octet-stream" });

      // Create an anchor element
      const a = document.createElement("a");

      // Set the "download" attribute
      a.setAttribute("download", "Plan.pptx");

      // Set the "href" attribute to the Blob object
      a.href = URL.createObjectURL(file);

      // Trigger the download
      a.click();
    } catch (err) {
      return false;
    }
  };

  const handleCardCheckboxChange = (cardId, cardData) => {
    let newCardCheckboxes = [...cardCheckboxes];
    let newCheckedCardData = [...checkedCardData];

    if (newCardCheckboxes.includes(cardId)) {
      newCardCheckboxes = newCardCheckboxes.filter((id) => id !== cardId);
      newCheckedCardData = newCheckedCardData.filter(
        (data) => data.id !== cardId
      );
    } else {
      newCardCheckboxes.push(cardId);
      newCheckedCardData.push(cardData);
    }

    setCardCheckboxes(newCardCheckboxes);
    setCheckedCardData(newCheckedCardData);
    setSelectAllChecked(newCardCheckboxes.length === filteredMedia.length);
  };

  // block & unblock media with toggle button
  const handleToggleButton = async (id) => {
    if (staffPermission?.can_edit == 1) {
      await blockkMediaApi(id);
      const updatedMedia = filteredMedia.map((response) => {
        if (response.id === id) {
          response.block = response.block === 0 ? 1 : 0;
        }
        return response;
      });
      setUpdt(!updt);
      setFilteredMedia(updatedMedia);
    } else {
      alert("you don't have permission for this!");
    }
  };

  return (
    <>
      <div className="containers">
        {/* Sidebar component */}
        <div className="container-sidebar">
          <SideBar />
        </div>
        <div className="container-pages">
          <div className="task-panel">
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
            <hr />
            <div className="row my-md-3">
              <div className="col-md-6">
                <div className="form-group">
                  <div className="checkbox checkbox-primary pull-left">
                    <input
                      type="checkbox"
                      id="selectall"
                      name="selectall"
                      className="allcheckselect me-1"
                      data-toggle="tooltip"
                      data-original-title=""
                      title=""
                      checked={selectAllChecked}
                      onChange={handleSelectAllChange}
                    />
                    <label htmlFor="selectall">Select all</label>
                  </div>
                </div>
              </div>
              <div className="col-md-6 wishlist_div">
                <button
                  className="btn btn-wishlist"
                  disabled={checkedCardData.length == 0}
                  onClick={handleShow}
                >
                  View Wishlist
                </button>
                <button
                  className="btn btn-wishlist me-2"
                  id="preview_ppt"
                  data-toggle="modal"
                  data-target="#view_ppt"
                  disabled={checkedCardData.length == 0}
                  onClick={(e) => excel("excel")}
                >
                  Download EXCEL
                </button>
                <button
                  className="btn btn-wishlist me-2"
                  id="preview_ppt"
                  data-toggle="modal"
                  data-target="#view_ppt"
                  disabled={checkedCardData.length == 0}
                  onClick={(e) => powerpoint("ppt")}
                >
                  Download PPT
                </button>
              </div>
            </div>
            <div className="row my-md-5 mt-md-0">
              {filteredMedia.map((response, i) => {
                // Convert the available_date to a Date object
                const availableDate = new Date(response.available_date);

                // Extract the day, month, and year from the Date object
                const day = availableDate.getDate();
                const month = availableDate.getMonth() + 1; // Month is zero-based
                const year = availableDate.getFullYear();

                // Create the formatted date string
                const formattedDate = `${day < 10 ? "0" + day : day}-${
                  month < 10 ? "0" + month : month
                }-${year}`;

                return (
                  <div className="col-md-3 my-2" key={i}>
                    <div className="card border-0 position-relative">
                      <img
                        className="card-img-top"
                        src={response.thumbnail}
                        alt="image"
                      />
                      <div className="card-body p-md-2 pb-md-3">
                        <button className="border-0" id="blocked">
                          {response.block === 1 ? (
                            <>Blocked</>
                          ) : response.booked === 0 ? (
                            <>Available</>
                          ) : (
                            <>Booked</>
                          )}
                        </button>
                        <h6
                          className="card-text mb-2"
                          style={{
                            color: "#005FBA",
                            fontSize: "14px",
                            fontWeight: "400",
                          }}
                        >
                          <input
                            type="checkbox"
                            className="me-1"
                            checked={cardCheckboxes.includes(response.id)}
                            onChange={() =>
                              handleCardCheckboxChange(response.id, response)
                            }
                          />
                          {response.medianame}
                        </h6>
                        <p className="card-text mb-1">
                          Available from : {formattedDate}
                        </p>

                        {/* Toggle Button */}
                        <div className="form-check form-switch mt-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`toggleButton${i}`}
                            checked={response.block === 1}
                            onChange={() => handleToggleButton(response.id)}
                          />
                          <label
                            className="form-check-label mt-0"
                            htmlFor={`toggleButton${i}`}
                          >
                            Block
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Wishlist
        show={show}
        handleClose={handleClose}
        checkedCardData={checkedCardData}
        allMedia={allMedia}
      />
      <style jsx>
        {`
          span {
            font-size: 0.8rem !important;
          }

          p {
            font-size: small;
            color: #737373;
          }
          .card {
            box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
              rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
          }
          .card-img-top {
            height: 30vh;
          }
          #blocked {
            font-size: 12px;
            position: absolute;
            right: 3.5px;
            color: #ffffff;
            top: 3.5px;
            padding: 2px 15px;
            background: #e22512;
            border-radius: 3px;
            border: none;
          }
          .wishlist_div {
            right: 0px;
            position: absolute;
          }
        `}
      </style>
    </>
  );
};

export default withAuth(Index);
