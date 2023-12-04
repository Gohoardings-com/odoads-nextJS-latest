import { getAllCampaignApi, getAllStaffApi } from "@/apis/apis";
import React, { useState, useEffect } from "react";
import { MdCall } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';
const Dashboard2 = () => {
  const [posts, setPosts] = useState([]);
  const [allCamp, setAllCamp] = useState([]);
  const [campPermission, setCampPermission] = useState();
  const [staffPermission, setStaffPermission] = useState();

    //all campaign api
    const userIsAuthenticated =
    typeof window !== "undefined" && Cookies.get("odoads_goh") !== undefined;

    
  //all staff api
  const allData = async () => {
   
    const data = await getAllStaffApi();
    setPosts(data);
  };


  const getData = async () => {
   
      const allData = await getAllCampaignApi();

      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to midnight (00:00:00)
  
      const filteData = allData.filter((data) => {
        const dataDate = new Date(data.date_finished);
        dataDate.setHours(0, 0, 0, 0); // Reset time to midnight (00:00:00)
        return dataDate >= today;
      });
  
      setAllCamp(filteData);
    
    
  };

  // Function to generate WhatsApp URL
  const getWhatsAppLink = (phoneNumber, message) => {
    const whatsappUrl = `https://wa.me/${encodeURIComponent(
      phoneNumber
    )}?text=${encodeURIComponent(message)}`;
    return whatsappUrl;
  };

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  //usr permision
  const permissions = useSelector((state) => state.user.userPermissions);

  useEffect(() => {
    if(userIsAuthenticated){
      getData();
      allData();
    }
 
  }, [userIsAuthenticated]);

  useEffect(() => {
    if (permissions.length >= 1) {
      const camp = permissions.filter(
        (media) => media.short_name === "plan_block_book"
      );
      const staff = permissions.filter((media) => media.short_name === "staff");
      setCampPermission({ ...camp[0] }); // Assuming camp is an array with a single element
      setStaffPermission({ ...staff[0] }); // Assuming staff is an array with a single element
    }
  }, [permissions]);

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-md-8 p-0 pe-3 ">
          <div className="card rounded-3 p-3 border-0 no-data">
            <h5 className="mb-0">
              Ongoing & Upcoming Campaigns
              {/* <p className="float-end text-mute ">Coustomer</p> */}
            </h5>
            <hr />
            {allCamp.length > 0 && campPermission?.can_view == 1 ? (
              allCamp.map((data, i) => (
                <div className="row" key={i}>
                  <div className="col-md-8 d-flex  p-2 py-1">
                    <img
                      src="../../imgs/billboard.png"
                      alt="Preview"
                      style={{
                        width: "40px",
                        height: "40px",
                        opacity: "0.5",
                      }}
                    />

                    <div className="text-start ps-3 pt-1">
                      <h6
                        className="name mb-0"
                        style={{ textTransform: "capitalize" }}
                      >
                        {data.name}
                      </h6>
                      <p className="text-mute">
                        End date {formatDate(data.deadline)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4 p-2  pt-3 ">
                    <div
                      className="card p-1 ps-2 pe-2  float-end "
                      style={{
                        width: "10vw",
                        // backgroundColor: "#EEEFF4",
                        textAlign: "center",
                      }}
                    >
                      <p
                        className=" mb-0 text-mute"
                        style={{ fontSize: ".6.2rem", letterSpacing: ".5px" }}
                      >
                        {data.customer}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className=" text-mute d-flex justify-content-center ">
                No campaign to show
              </div>
            )}
          </div>
        </div>
        <div className="col-md-4 p-0">
          <div className="card rounded-3 p-3 border-0 no-data">
            <h5 className="mb-0 ">
              All Staff
              <img
                src="../../imgs/staff.png"
                alt="Preview"
                className="float-end"
                style={{ height: "30px", position: "relative", top: "-10px" }}
              />
            </h5>
            <hr className="mt-0" />

            {posts.length > 0 && staffPermission?.can_view == 1 ? (
              posts.map((data, i) => (
                <div className="row" key={i}>
                  <div className="col-md-9 d-flex  p-2 py-1">
                    <img
                      src={
                        data.profile_image
                          ? data.profile_image
                          : "../../imgs/defaulUser.png"
                      }
                      alt="Preview"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    />

                    <div className="text-start ps-3 pt-1">
                      <h6
                        className="name mb-0"
                        style={{ textTransform: "capitalize" }}
                      >
                        {data.firstname}
                      </h6>
                      <p className="text-mute">{data.role}</p>
                    </div>
                  </div>
                  <div className="col-md-3 p-2  pt-3 d-flex">
                    {/* WhatsApp Button */}
                    <a
                      href={getWhatsAppLink(
                        data.phonenumber,
                        "Hello from your Company!"
                      )}
                      target="_blank" // Add this attribute to open link in a new tab
                      rel="noopener noreferrer" // Recommended for security reasons
                    >
                      <div
                        className="card p-1 card-hov  "
                        style={{ width: "fit-content" }}
                      >
                        <BsWhatsapp style={{ color: "#86888C" }} />
                      </div>
                    </a>
                    {/* Calling Button */}

                    <a href={`tel:${data.phonenumber}`}>
                      <div
                        className="card p-1 card-hov ms-2"
                        style={{ width: "fit-content" }}
                      >
                        <MdCall style={{ color: "#86888C" }} />
                      </div>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className=" text-mute d-flex justify-content-center ">
                No staff to show
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .no-data {
          min-height: 55vh;
        }
        .name {
          color: #353e5d;
          font-size: 13px;
        }
        .text-mute {
          color: #9aabc3;
          font-size: 13px;
        }
        h5,
        p {
          font-size: 13px;
        }
        .card-hov {
          transition-duration: 0.3s;
        }
        .card-hov:hover {
          background-color: #eeeff4;
        }
      `}</style>
    </div>
  );
};

export default Dashboard2;
