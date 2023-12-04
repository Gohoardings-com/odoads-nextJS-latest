import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { allTasksApi } from "@/apis/apis";
import Cookies from 'js-cookie';
const Dashboard1 = () => {
  const [campaignData, setCampaignData] = useState({
    process: 0,
    New: 0,
    Hold: 0,
    OPEN: 0,
  });

  //all tsak api
  const userIsAuthenticated =
    typeof window !== "undefined" && Cookies.get("odoads_goh") !== undefined;

  const getAllTask = async () => {
    if (userIsAuthenticated) {
      const data = await allTasksApi();
      const process = data.filter(
        (media) => media.status === "Processing"
      ).length;
      const New = data.filter((media) => media.status === "New").length;
      const Hold = data.filter((media) => media.status === "Hold").length;
      const OPEN = data.filter((media) => media.status === "OPEN").length;

      setCampaignData({
        process,
        New,
        Hold,
        OPEN,
      });
    }
  };

  //usr data
  const userDetails = useSelector((state) => state.user.userData);

  useEffect(() => {
    getAllTask();
  }, [userIsAuthenticated]);
  return (
    <div className="container-fluid py-2 p-4 rounded-3">
      <div className="row">
        <div className="col-md-4  d-flex  p-2 py-3">
          <img
            src={
              userDetails?.profile_image
                ? userDetails.profile_image
                : "../../imgs/man.png"
            }
            alt="Preview"
            style={{ width: "80px", height: "80px", borderRadius: "50%" }}
          />

          <div className="text-start ps-3 pt-3">
            <h5 className="">Welcome {userDetails?.firstname}</h5>
            <p className="text-mute">It's nice to see you again</p>
          </div>
        </div>
        <div className="col-md-4 p-2 py-3">
          {" "}
          <div className="text-start p-2 pt-3">
            <h5 className="">
              {campaignData &&
                campaignData.process +
                  campaignData.Hold +
                  campaignData.OPEN +
                  campaignData.New}{" "}
              Tasks
            </h5>
            <p className="text-mute">Are currently pending</p>
          </div>
        </div>
        <div className="col-md-4 p-2">
          <div className="card p-3 py-2 border-0 ">
            <p className="text-dark">
              Start using our media and campaign management tools
            </p>

            <h6 className="text-dark"> Learn More</h6>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .container-fluid {
            background-color: #ffffff;
          }
          .card {
            background-color: #ffb433;
            opacity: 0.85;
            box-shadow: #ffd283 -3px 7px 15px -4px;
          }
          .text-mute {
            color: #9aabc3;
            font-size: 13px;
          }
          h5,
          p {
            color: #353e5d;
            font-size: 13px;
          }
          h6 {
            cursor: pointer;
            border-bottom: 1.5px solid transparent;
            width: fit-content;
            font-size: 13px;
          }
          h6:hover {
            border-bottom: 1.5px solid #595349;
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard1;
