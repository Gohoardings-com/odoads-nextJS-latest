import React from "react";
import { CiMobile2, CiSettings } from "react-icons/ci";
import { TbTools } from "react-icons/tb";
import { BsRecycle, BsChat, BsLayers } from "react-icons/bs";

const Section1 = () => {
  const data = [
    {
      icon: <CiMobile2 className="icon_homepage" />,
      heading: " Media Inventory",
      contant: `Dedicated CRM for OOH Industry to manage media assets,
    generation of plan PPT/ Excel/ PDF including sites
    information, rates, availability, images with live Google
    map and Google earth plotting.`,
    },
    {
      icon: (
        <CiSettings className="icon_homepage" style={{ color: "#50a1ff" }} />
      ),
      heading: " Campaigns Management",
      contant: `Booking, blocking, FOC and rotational information of campaigns.
   Cost sheet, campaign profitability, site performance, PO management.`,
    },
    {
      icon: <TbTools className="icon_homepage" style={{ color: "#926dde" }} />,
      heading: "Leads / Media Request",
      contant: `This enables marketing and sales teams to work 
  together on the leads, never missing out any interaction or touch-points..`,
    },
    {
      icon: <BsLayers className="icon_homepage" style={{ color: "#ffba00" }} />,
      heading: "Invoice & Contracts",
      contant: `Estimations, invoicing, credit notes, payments, revenue, outstanding, contracts.`,
    },
    {
      icon: (
        <BsRecycle className="icon_homepage" style={{ color: "#ff4954" }} />
      ),
      heading: "Business Intelligence",
      contant: `Dashboards to track your business growth with 150+ custom reports.`,
    },
    {
      icon: <BsChat className="icon_homepage" style={{ color: "#3cd458" }} />,
      heading: "Customer Management",
      contant: `Managing customer and their contact information, Customer interaction history,
   Sending the documents directly from the program and many more.`,
    },
  ];
  return (
    <div className="container-xxl   container-xl container-lg container-md  mt-4 mt-md-0">
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
            <div
              className="col-md-8 col-12 mx-md-auto my-3 my-md-5 p-0"
              style={{ textAlign: "center" }}
            >
              <iframe
              
                src="https://www.youtube.com/embed/_tAziy85tX0?controls=0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                className="vdo-1"
              ></iframe>
            </div>
            <div className="w-100"></div>
            {data.map((items, index) => (
              <div className="col-md-6  col-12" key={index}>
                <div className="media my-2">
                  <div>{items.icon}</div>
                  <div className="media-body">
                    <h5 className="lead2"> {items.heading}</h5>
                    <p className="textt">{items.contant}</p>
                  </div>
                </div>
              </div>
            ))}
     
          </div>
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

          p{
            font-size: 1.15rem;
            line-height: 1.9;
            color: #757575;
            letter-spacing: 0.5px;
            
          }
          .textt{
            font-size: .9rem;
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
          .icon {
            font-size: 2rem;
          }
          
          .vdo-1{
           width:43vw;
           height:50vh;
          }.
        


        `}
      </style>
    </div>
  );
};

export default Section1;
