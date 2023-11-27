import React from "react";
import Review from "../customer-review";

const Section3 = () => {
  return (
    <>
      <section
        className="section  bg-gray "
        style={{ backgroundColor: "#FAFBFB" }}
      >
        <div className="container">
          <header className="section-header text-center">
            <small>Testimonials</small>
            <h2>Happy Customers</h2>
            <hr style={{ borderTopColor: "#919191" }} className="my-3" />
            <p className="fw-light ">
              Join thousands of satisfied customers using our software globally.
            </p>
          </header>

          <Review />
        </div>
      </section>

      <style jsx>
        {`
          h2 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            font-weight: 400;
            line-height: 1.5;
            letter-spacing: 0.5px;
            color: #323d47;
            font-family: Dosis, sans-serif !important;
          }

          p {
            font-size: 1.15rem;
            line-height: 1.9;
            color: #757575;
            letter-spacing: 0.5px;
          }
        `}
      </style>
    </>
  );
};
export default Section3;
