import React from "react";
import { CiMobile2, CiSettings } from "react-icons/ci";
import { TbTools } from "react-icons/tb";
import Slider from "react-slick";
import { BsRecycle, BsChat, BsLayers } from "react-icons/bs";

const Section1 = () => {
  const data = [
    {
      icon: "../../imgs/media inventory.jpg",
      heading: " Media Inventory",
      contant: `Dedicated CRM for OOH Industry to manage media assets,
    generation of plan PPT/ Excel/ PDF including sites
    information, rates, availability, images with live Google
    map and Google earth plotting.`,
    },
    {
      icon: "../../imgs/Campaigns Management.jpg",
      heading: " Campaigns Management",
      contant: `Booking, blocking, FOC and rotational information of campaigns.
   Cost sheet, campaign profitability, site performance, PO management.`,
    },
    {
      icon: "../../imgs/Leads  Media Request.jpg",
      heading: "Leads / Media Request",
      contant: `This enables marketing and sales teams to work 
  together on the leads, never missing out any interaction or touch-points..`,
    },
    {
      icon: "../../imgs/Invoice & Contracts.jpg",
      heading: "Invoice & Contracts",
      contant: `Estimations, invoicing, credit notes, payments, revenue, outstanding, contracts.`,
    },
    {
      icon: "../../imgs/business intelligence.jpg",
      heading: "Business Intelligence",
      contant: `Dashboards to track your business growth with 150+ custom reports.`,
    },
    {
      icon: "../../imgs/customer managment.jpg",
      heading: "Customer Management",
      contant: `Managing customer and their contact information, Customer interaction history,
   Sending the documents directly from the program and many more.`,
    },
  ];
  {
    var settings = {
      // dots: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: false,
      speed: 3500,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 720,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    };
  }

  let slider = settings;
  return (
    <div className="container-xxl   container-xl container-lg container-md  mt-4 my-md-5 ">
      <section className="section pb-0">
        <div className="">
          <header className="section-header text-center">
            <small>Welcome</small>
            <h2>Get a Better Understanding</h2>
            <hr style={{ borderTopColor: "#919191" }} className="my-3" />
            <p className="fw-light ">
              Holisticly implement fully tested process improvements rather than
              dynamic internal.
            </p>
          </header>
          <div className="row gap-y">
          <Slider {...settings}>
              {data.map((items, index) => (
                <div className="p-3" key={index}>
                  <div className="card-wrapper card border-0 p-3">
                    <div
                      className="background-image"
                      style={{
                        backgroundImage: `url('${items.icon}')`,
                      }}
                    />
                    <div className="content">
                      <h5 className="lead2 mt-2"> {items.heading}</h5>
                      <p className="textt">{items.contant}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
      <style jsx>
        {`
          .card-wrapper {
            position: relative;
            height: 220px;
            background-image: linear-gradient(#dbdbdb, #ffffff);
            overflow: hidden;
            transition: transform 0.3s ease; 
          }
          .card-wrapper:hover {
            transform: scale(1.1);
            
          }
          .background-image {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-size: cover;
            background-position: center;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
        

          .card-wrapper:hover .background-image {
            opacity: .5;
          }

          .content {
            position: relative;
            z-index: 1;
          }
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
          .textt {
            font-size: 0.9rem;
            line-height: 1.8;
            color: #757575;
            letter-spacing: 0.5px;
            font-family: Dosis, sans-serif !important;
          }
          .lead2 {
            font-weight: 400;
            color: #757575;
            line-height: 1.4;
            font-size: 1.23047rem;
            letter-spacing: 0.5px;
            font-family: Dosis, sans-serif !important;
          }
          .card-wrapper:hover .textt,.lead2{
            color: black;
          }
          .icon {
            font-size: 2rem;
          }
        `}
      </style>
    </div>
  );
};

export default Section1;
