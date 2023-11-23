import React, { useEffect, useState } from "react";
import Typed from "react-typed";
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

      <div className="zzz">
        <div className=" pt-0 ">
          <Navbar />
        </div>
        <div className="position-static container-home">
          <div className="row align-items-center h-100 upText">
            <div className="col-md-7 col-12">
              <h1 className="hero-text ">
                Built to <br className="br-tag" />
                <Typed
                  strings={["Simplify", "Automate", "Connect"]}
                  typeSpeed={80}
                  backSpeed={80}
                  loop
                />
                <span className="typed-cursor"></span>
              </h1>
              <p className="nav-link">
                End to end OUTDOOR MEDIA
                <br />
                INVENTORY & CAMPAIGN MANAGEMENT System
              </p>
            </div>

            <div className="col-md-5 col-12 position-relative page">
              <img
                src="../../imgs/banner-gif.gif"
                alt="Animated GIF"
                className="gif-image"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .gif-image {
            width: 100%; 
            height: auto;
          }
          .nav-link {
            cursor: pointer;
            transition: all 0.3s ease-out;
            padding-bottom: 0;
            cursor: pointer;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 0.71em;
            color: rgb(0 0 0 / 65%);
            word-spacing: 2px;

            padding-bottom: 0;
          }
        
          .constellation {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          .body {
            padding: 0vh 8vw;
            height: 100vh;
            overflow: hidden !important;
            margin: auto;

            background-attachment: fixed;
            background-color: #dbdbdb;

            position: relative;
            z-index: -3;
          }

          .hero-text {
            font-weight: bold;
            font-size: 7em;
            color: black;
            background: url("../../imgs/blackhq.jpg");
            -webkit-background-clip: text;
            background-position: center;
            -webkit-text-fill-color: transparent;
            transition: 0.5s;
          }
          .hero-text:hover {
            letter-spacing: 3px;
            cursor: pointer;
          }
          .upText {
            -webkit-animation: upText 1s ease;
            animation: upText 1s ease;
            -webkit-animation-timing-function: ease;
            animation-timing-function: ease;
          }

          @-webkit-keyframes upText {
            0% {
              transform: translateY(2rem);
              opacity: 0;
              visibility: hidden;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
              visibility: visible;
            }
          }

          @keyframes upText {
            0% {
              transform: translateY(2rem);
              opacity: 0;
              visibility: hidden;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
              visibility: visible;
            }
          }
          @media screen and (max-width: 720px) {
            .hero-text {
              font-size: 4.5em;
            }
            .hero-text:hover {
              letter-spacing: 2px;
            }
            .br-tag {
              display: block;
            }
            .body {
              padding: 0.6vh 4vw;
            }
            
            .cont-btn {
              display: none;
            }
            .lead2 {
              width: 95vw;
            }

            .search-btn {
              letter-spacing: 1px !important;
              width: auto;
              font-size: 10px !important;
              margin-left: 0px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Banner;
