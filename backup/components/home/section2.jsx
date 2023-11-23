import React from "react";
import Slider from "react-slick";
import { MdPermMedia } from "react-icons/md";
import {
  TbBrandCampaignmonitor,
  TbFileInvoice,
  TbFileReport,
} from "react-icons/tb";
import { RiFilePpt2Line } from "react-icons/ri";
import { ImFilePdf } from "react-icons/im";
import { BsFileEarmarkExcel } from "react-icons/bs";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";

const Section2 = () => {
  const slider_icon = [
    {
      icon: <HiOutlineDocumentDuplicate />,
      name: "Dashboard",
    },
    {
      icon: <MdPermMedia />,
      name: "Media Availability",
    },
    {
      icon: <TbBrandCampaignmonitor />,
      name: "Media Campaign",
    },
    {
      icon: <TbFileInvoice />,
      name: "Invoice",
    },
    {
      icon: <TbFileReport />,
      name: "Report",
    },
    {
      icon: <RiFilePpt2Line />,
      name: "PPT",
    },
    {
      icon: <ImFilePdf />,
      name: "PDF",
    },
    {
      icon: <BsFileEarmarkExcel />,
      name: "Excel",
    },
  ];

  {
    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 2,
      autoplay: true,
      speed: 3500,
      pauseOnHover: true,

      // responsive: [
      //   {
      //     breakpoint: 1024,
      //     settings: {
      //       slidesToShow: 3,
      //       slidesToScroll: 2,
      //       initialSlide: 0,
      //     },
      //   },
      // ],
    };
  }

  let slider = settings;
  return (
    <section
      className="section  section-2"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #f9f7ff 0%, #fff 50%, #f6f3ff 100%)",
      }}
    >
      <div className="section-header container">
        <div className="row gap-y align-items-center">
          <div className="col-md-6 opcty ms-md-5 ">
            <h2 className="mb-3">Why we stand out?</h2>
            <p className="lead mb-0">
              ODO believes that <br />
              <span
                style={{
                  fontSize: ".9rem",
                  fontWeight: 400,
                  fontStyle: "italic",
                  marginLeft: "60px",
                }}
              >
                “The faster you fulfill requirements of your clients,
                <br />
              </span>
              <span
                style={{
                  fontSize: ".9rem",
                  fontWeight: 400,
                  fontStyle: "italic",
                  marginLeft: "60px",
                }}
              >
                the faster you close the deal”
              </span>
              <br /> We let you to complete all your traditional formalities in
              a click.
            </p>
            <br />

            <br />
            {/*slider component */}
            <div
              className="row gap-y slick-initialized slick-slider slick-dotted"
              data-provide="slider"
              data-slides-to-show="3"
              data-slides-to-scroll="2"
              data-dots="true"
            >
              {/*slider items */}
              <Slider {...slider}>
                {slider_icon.map((items, index) => (
                  <div className="text-center main_div" key={index}>
                    <div className="icon">{items.icon}</div>
                    <h6>{items.name}</h6>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="col-lg-5 ms-auto mt-5 me-1">
            <img
              src="../../imgs/home-blocks-and-elements.jpg"
              alt="..."
              className="home-img"
            />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          h6 {
            color: #323d47;
            font-size: 0.8rem;
            line-height: 1.5;
            font-weight: 400;
          }
          .icon {
            color: #868e96 !important;
            font-size: 2rem !important;
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
          .lead {
            font-size: 1.125rem;
            font-weight: 300;
          }
          .home-img {
            width: 90%;
            height: auto;
            float: right;
          }
        `}
      </style>
    </section>
  );
};

export default Section2;
