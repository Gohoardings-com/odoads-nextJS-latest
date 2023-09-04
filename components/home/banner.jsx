import React, { useEffect, useState } from "react";
import Typed from "react-typed";
import Pages from "./banner-slider";
import Navbar from "../navbar/navbar";
import { useRouter } from "next/router";
import "animate.css";
const Banner = () => {
  const route = useRouter();

  const [loged, setLogged] = useState();
  useEffect(() => {
    // Check if the localStorage data has expired
    const expirationTime =
      typeof window !== "undefined" && localStorage.getItem("expirationTime");
    if (expirationTime && Date.now() > expirationTime) {
      localStorage.removeItem("user");
      localStorage.removeItem("expirationTime");
    }

    //check user logged in or not
    const userIsAuthenticated =
      typeof window !== "undefined" && localStorage.getItem("user") !== null;
    setLogged(userIsAuthenticated);
  }, []);

  return (
    <>
      <div className="header  text-white h-fullscreen body "></div>
      <div class="star-field">
        <div class="layer"></div>
        <div class="layer"></div>
        <div class="layer"></div>
      </div>
      <div className="zzz">
        <div className=" pt-0 ">
          <Navbar />
        </div>
        <div className="position-static ss container-home">
          <div className="row align-items-center h-100">
            <div className="col-md-7 col-12">
              <h1>
                Built to{" "}
                <br className="br-tag"/>
                <Typed
                  strings={["Simplify", "Automate", "Connect"]}
                  typeSpeed={80}
                  backSpeed={50}
                  loop
                />
                <span className="typed-cursor"></span>
              </h1>
              <p className="lead2 my-md-5 my-4  ">
                End to end{" "}
                <strong>
                  OUTDOOR MEDIA INVENTORY &amp; CAMPAIGN MANAGEMENT
                </strong>{" "}
                System
              </p>
              <div className="pt-md-5">
                <p
                  className="btn btn-success me-2 search-btn  cont-btn"
                  onClick={() => route.push("/contact")}
                >
                  Contact Us
                </p>
                {loged ? (
                  <p
                    className="btn btn-outline-light ms-md-2 search-btn "
                    onClick={() => route.push("/features")}
                  >
                    Features
                  </p>
                ) : (
                  <p
                    className="btn btn-outline-light ms-md-2 search-btn "
                    onClick={() => route.push("/login")}
                  >
                    Start free Now
                  </p>
                )}
              </div>
            </div>

            <div className="col-md-5 col-12 position-relative page">
              <Pages />
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          h1 {
            font-family: Dosis, sans-serif !important;
            font-size: 3rem !important;
            color: #fff;
            font-weight: 500 !important;

            line-height: 1.5;
          }
          .lead2 {
            width:35vw;
            color: rgba(255, 255, 255, 0.85) !important;
            font-size: 1.1rem !important;
            font-weight: 300 !important;
            line-height: 1.9;
          }

          .ss {
            padding-top: 21vh;
          }
          .constellation {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .search-btn {
            letter-spacing: 1.7px;
            text-transform: uppercase;
            border-radius: 10rem;
            font-weight: 600;
            width: 15vw;
            padding: 1em 1.5em;
            font-size: 13px;
            -webkit-transition: 0.15s linear;
            transition: 0.15s linear;
            text-transform: uppercase;
            outline: none;
            border: 1px solid transparent;
            cursor: pointer;
            text-align: center;
            font-family: "Open Sans", sans-serif;
            vertical-align: middle;
          }
          .btn-success {
            color: #fff !important;
            background-color: #3cd458 !important;
            border-color: #3cd458 !important;
            border: 1px solid #3cd458 !important;
          }
          .btn-success:hover {
            background-color: #2dce4b;
            border-color: #2dce4b;
            box-shadow: 0 1px 10px rgba(60, 212, 88, 0.4);
          }
          .btn-outline-light {
            color: rgba(255, 255, 255, 0.6);
            border-color: rgba(255, 255, 255, 0.3);
          }
          .btn-outline-light:hover {
            color: #757575;
            background-color: #f8f9fa;
            box-shadow: 0 1px 10px rgba(248, 249, 250, 0.4);
          }

          .body {
            padding: 0vh 8vw;
            height: 100vh;
            overflow: hidden !important;
            margin: auto;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            background-image: linear-gradient(-45deg, #667eea 0%, #764ba2 100%);
            background-attachment: fixed;
            position: relative;
            z-index: -3;
          }
          .br-tag{
            display:none;
          }
          @media screen and (max-width: 500px) {
            .br-tag{
              display:block;
            }
            .body {
              padding: 0.6vh 4vw;
            }
            .page,
            .cont-btn {
              display: none;
            }
            .lead2 {
              width:95vw;
            }
          
            .search-btn {
              letter-spacing: 1px !important;
              width: auto;
              font-size: 10px !important;
              margin-left:0px;
            }
            
          }
        `}
      </style>
    </>
  );
};

export default Banner;
