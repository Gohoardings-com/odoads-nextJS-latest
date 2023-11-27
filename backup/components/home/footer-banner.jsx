import React from "react";
import Link from "next/link";

const BubblesAnimation = () => {
  return (
    <div className="wrapper py-md-5 opacity-95">
      <section className="container ">
        <header className="section-header text-light my-5 text-center">
          <h2>Get It Now</h2>
          <p className=" mt-3 fw-light ps-3 pe-3 ms-md-1 pe-md-1">
            If you have made your decision to own this services, go ahead and
            press on the  following button to get registered in less than
            a minute.
          </p>
        </header>
        <p className="text-center ">
          <Link className="btn p-btn" href="/login">
            Start Free Now
          </Link>
        </p>
      </section>

      <style jsx>
        {`
        
          .wrapper {
            height: 60vh;
            width: 100%;
            position: relative;
            background: linear-gradient(-45deg,#667eea,#764ba2,#00cdac,#3cba92);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
   
          }

          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          
          .wrapper .container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          h2 {
            font-size: 3.5rem;
            margin-bottom: 0.5rem;
            line-height: 1.5;
            color: #FFFFFF !important;
            letter-spacing: 0.5px;
          
            font-family: Dosis, sans-serif !important;
          }
          p{
            font-size: 1.15rem;
            line-height: 1.9;
            color: rgba(255,255,255,0.85)!important;
            letter-spacing: 0.5px;
            
          }
          @media screen and (max-width:500px) {
            .wrapper {
              height: 80vh;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BubblesAnimation;
