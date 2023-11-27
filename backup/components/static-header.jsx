import React from "react";
import Navbar from "./navbar/navbar";

const Header = (props) => {
  return (
    <div
      className="parallax-container"
      style={{
        backgroundImage: `url(${props.url})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: 1,
        position : "relative",
        backgroundSize: "cover",
        height: "70vh",
      }}
    >
      <div className="container pt-1">
        <div className="mbil-navv">

      <Navbar/>
        </div>
      <div className="  text-center text-light all-content">
        <div className="row ">
          <h2 className=".lead-1">{props.lead1}</h2>
          <p className="my-3 fw-light">{props.lead2}</p>
        </div>
      </div>
      </div>
      <style jsx>
        {`
        @media screen and (max-width: 500px) {

          .mbil-navv {
            padding: 0px 14px 0px 14px;
          }
        }
      .all-content{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 60vh;
          }
          h2 {
            font-size: 2.4rem;
            margin-bottom: 0.5rem;
            line-height: 1.5;
            color: #FFFFFF !important;
            letter-spacing: 0.5px;
          
            font-family: Dosis, sans-serif !important;
          }
          p{
            font-size: 1.1rem;
            line-height: 1.9;
            color: rgba(255,255,255,0.85)!important;
            letter-spacing: 0.5px;
            
          }
        `}
      </style>
    </div>
  );
};

export default Header;
