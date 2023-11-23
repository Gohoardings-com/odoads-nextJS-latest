import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { TfiLayoutMediaLeft } from "react-icons/tfi";
import { RiPencilRuler2Line } from "react-icons/ri";

import {
  BsGraphUpArrow,
  BsFileEarmarkPdf,
  BsCalendar2Event,
} from "react-icons/bs";
import { FaStar, FaBullhorn } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";
import { SlNotebook } from "react-icons/sl";
import {
  MdOutlineEditNote,
  MdOutlineOutlinedFlag,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import Header from "../../components/static-header";
import BubblesAnimation from "../../components/home/footer-banner";
import Footer from "@/components/footer";
import Floatingnavbar from "@/components/navbar/navbar-float";

const Features = () => {
  const [imageHidden, setImageHidden] = useState(false);
  const { asPath } = useRouter();
  const features = [
    { icon: <TfiLayoutMediaLeft />, title: "One click ppt" },
    { icon: <BsFileEarmarkPdf />, title: "One click pdf" },
    { icon: <FaWpforms />, title: "One click Excel" },
    { icon: <SlNotebook />, title: "One click Invoice" },
    { icon: <MdOutlineEditNote />, title: "One click Report" },
    { icon: <BsCalendar2Event />, title: "One click Media Availability" },
    { icon: <MdOutlineOutlinedFlag />, title: "One click Media Campaign" },
    { icon: <MdOutlineSpaceDashboard />, title: "One click Dashboard Summary" },
  ];
  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector(".section-img");
      if (element) {
        const elementPosition = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (elementPosition.top <= windowHeight * 0.75) {
          setImageHidden(true);
        } else {
          setImageHidden(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <Head>
        <link rel="canonical" href={`https://www.odoads.com${asPath}`} />
        <title>
          Ads & Inventory Management Software for OOH/DOOH Media Owners &
          Vendors | OdoAds
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Our Comprehensive Outdoor Advertising Management Solution Offers OOH & DOOH Media Vendors, and Owners to Manage and Centralized for Data and Inventory Management"
        />
        <meta
          name="google-site-verification"
          content="fLT70DRZGdH5FUdrS8w1k2Zg_VTzNJGDF9ie9v4FAzM"
        />
        <meta
          name="keywords"
          content="Our Comprehensive Outdoor Advertising Management Solution Offers OOH & DOOH Media Vendors, and Owners to Manage and Centralized for Data and Inventory Management"
        />
        <meta
          property="og:title"
          content="Ads & Inventory Management Software for OOH/DOOH Media Owners & Vendors | OdoAds"
        />
        <meta
          property="og:siteName"
          content="Features - Management Software for OOH/DOOH Media Owners/Vendors"
        />
        <meta
          property="og:description"
          content="Our Comprehensive Outdoor Advertising Management Solution Offers OOH & DOOH Media Vendors, and Owners to Manage and Centralized for Data and Inventory Management"
        />
        <meta property="og:type" content="en_US" />
        <meta property="og:image" href="https://odoads.com/imgs/16.jpg" />
        <meta property="og:url" href={asPath} />
        <meta property="og:property" content="en_US" />
        <meta
          property="twiter:title"
          content="Ads & Inventory Management Software for OOH/DOOH Media Owners & Vendors | OdoAds"
        />
        <meta
          property="twiter:siteName"
          content="Features - Management Software for OOH/DOOH Media Owners/Vendors"
        />
        <meta
          property="twiter:description"
          content="Our Comprehensive Outdoor Advertising Management Solution Offers OOH & DOOH Media Vendors, and Owners to Manage and Centralized for Data and Inventory Management"
        />
        <meta property="twiter:type" content="en_US" />
        <meta property="twiter:image" href="https://odoads.com/imgs/16.jpg" />
        <meta property="twiter:url" href={asPath} />
        <meta property="twiter:property" content="en_US" />
      </Head>
      <Floatingnavbar />
      <Header
        url="../../imgs/istockphoto-1321462048-612x612.jpg"
        lead1="Why our tech stands at peak?"
        lead2="ODO is faster than your thoughts, friendly than your friends and advanced than this century"
      />

      <section>
        <div className="container p-3 p-md-0 pt-md-3">
          <div className="row  ">
            <div className="col-md-6 mt-5 ">
              <h2 className="lead-3 ">Trusted by the thousands</h2>
              <p className="lmt">
                30% of the media owners use ODO to handle and operate their
                media.
              </p>

              <div className="rating mb-2">
                <label>
                  <FaStar className="text-warning" />
                </label>
                <label>
                  <FaStar className="text-warning m-1" />
                </label>
                <label>
                  <FaStar className="text-warning" />
                </label>
                <label>
                  <FaStar className="text-warning m-1" />
                </label>
                <label>
                  <FaStar className="text-warning " />
                </label>
              </div>

              <q className="lmt">
                ODO takes care of all your stress. It is desigend in a way that
                all
                <br /> your media operation and inventories could be easily
                handled
              </q>
            </div>
            <div className="col-md-1 text-end bbb"></div>
            <div className="col-md-5 text-end bbb">
              <div className={`section-img ${imageHidden ? "show " : "hide"}`}>
                <img
                  src="../../imgs/5995355.png"
                  alt="..."
                  data-aos="fade-left"
                  className="img-1"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray text-center  p-3 p-md-0">
        <div className="container">
          <header className="section-header text-center my-md-5 my-3">
            <small>Features</small>
            <h2 className="lead">Our Key Features</h2>
          </header>

          <div className="row mt-md-4">
            <div className="col-12 col-md-4 text-center">
              <img src="../../imgs/verify.png" alt="..." className="img-2" />
              <h6 className="card-icon-text fw-bold mt-2">Register</h6>
              <h6 className="card-icon-text mt-4">
                From our website; odoads.com, register your company just in a
                minute.
              </h6>
            </div>
            <div className="col-12 col-md-4 text-center">
              <img src="../../imgs/save-time.png" alt="..." className="img-2" />
              <h6 className="card-icon-text fw-bold mt-2">
                Organize Your Media
              </h6>
              <h6 className="card-icon-text mt-4">
                Upload all your media and related details at our system.
              </h6>
            </div>
            <div className="col-12 col-md-4 text-center">
              <img
                src="../../imgs/recruitment.png"
                alt="..."
                className="img-2"
              />
              <h6 className="card-icon-text fw-bold mt-2">Save Your Time</h6>
              <h6 className="card-icon-text mt-4">
                Ready to go. Experience a better performance in your deals
                andsave your time.
              </h6>
            </div>
          </div>
        </div>
      </section>
      <section className="section  p-3 p-md-0">
        <div className="container">
          <header className="section-header text-center my-5">
            <h2 className="lead">The Work Process</h2>
            <p className="textt fw-light">
              {" "}
              Explore the best SaaS template in the market in a short 1-minute
              video.
            </p>
          </header>

          <div className="work ">
            <div className="work-card text-center">
              <img
                src="../../imgs/change-management.png"
                alt="..."
                className="img-3"
              />
              <h6 className="card-icon-text fw-bold mt-2">
                Inventory Management
              </h6>
              <h6 className="card-icon-text mt-4">
                Dedicated CRM for OOH Industry to manage media assets,
                generation of plan PPT/Excel/PDF
              </h6>
            </div>
            <div className="work-card text-center">
              <img
                src="../../imgs/social-media.png"
                alt="..."
                className="img-3"
              />
              <h6 className="card-icon-text fw-bold mt-2">Media Management</h6>
              <h6 className="card-icon-text mt-4">
                Information of sites, rates, availability, images with live
                Google map plotting
              </h6>
            </div>
            <div className="work-card text-center">
              <img src="../../imgs/profit-growth.png" alt="..." className="img-3" />
              <h6 className="card-icon-text fw-bold mt-2">Sales Management</h6>
              <h6 className="card-icon-text mt-4">
              This enables to handle estimation,
invoicing, credit notes, payments and

other expenses
              </h6>
            </div>
            <div className="work-card text-center">
              <img src="../../imgs/marketing.png" alt="..." className="img-3" />
              <h6 className="card-icon-text fw-bold mt-2">Campaign Management</h6>
              <h6 className="card-icon-text mt-4">
              Booking, blocking, rotational
information of campaign,
site performance
              </h6>
            </div>
          </div>
        </div>
      </section>
      <section className="section bg-gray pt-6 pb-3 pb-md-5">
        <div className="container p-3 p-md-0">
          <header className="section-header text-center my-5">
            <h2 className="lead">One Click Features</h2>
            <p className="textt fw-light">
              Limitless possibilities. What will you create?
            </p>
          </header>

          <div className="row gap-y text-center">
            {features.map((feature, index) => (
              <div className="col-md-6 col-lg-3 col-4 py-md-6" key={index}>
                <p className="card-icon-2">{feature.icon}</p>
                <h6 className="card-icon-text">{feature.title}</h6>
              </div>
            ))}
          </div>
        </div>
      </section>
      <BubblesAnimation />
      <style jsx>
        {`
          .bbb {
            overflow: hidden; /* Add this line to the container to hide overflowing content */
          }
          .img-2 {
            height: 40px;
            width: auto;
          }
          .img-3 {
            height: 50px;
            width: auto;
          }
          .work-card {
            padding: 1rem;
          }
          @media screen and (max-width: 720x) {
            .bbb {
              display: none;
            }
          }
          .section-img {
            transition: transform 0.5s ease-in-out, opacity 1s ease-in-out;
            transform: translateX(
              30%
            ); /* Adjust the percentage to control the slide amount */
            opacity: 1; /* Set initial opacity to fully visible */
          }

          .section-img.hide {
            transform: translateX(
              10%
            ); /* Adjust the percentage to control the slide amount before hiding */
            opacity: 0; /* Set opacity to 0 to fade out the image */
          }
          .section-img.show {
            transform: translateX(0);
          }

          .lead-3 {
            font-size: 1.6rem;
            font-weight: 400;
            font-family: Dosis, sans-serif;
          }
          .lead {
            font-family: Dosis, sans-serif;
          }
          .textt {
            font-size: 1.15rem;
            line-height: 1.9;
            color: #757575;
            letter-spacing: 0.5px;
          }
          .img-1 {
            width: 100%;
          }
          small {
            display: inline-block;
            font-size: 0.6875rem;

            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.75px;
            margin-bottom: 1.5rem;
            word-spacing: 2px;
            color: rgba(153, 153, 153, 0.6);
          }

          q {
            display: inline-block;
            font-size: 0.8rem;

            font-weight: 600;
          }
          .card-title {
            display: inline-block;
            font-size: 0.9rem;

            font-weight: 500;
          }
          .card-descript {
            font-weight: 300;
            color: white;
            font-size: 0.78rem;
            max-width: 470px;
          }
          .card-icon {
            padding: 1rem;
            width: fit-content;
            height: auto;
            border: 1px solid rgb(224, 227, 234);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 18px;
          }

          .card-icon-2 {
            font-size: 34px;
            color: #9b9ea0;
          }
          .card-icon-text {
            font-size: small;
            color: #818283;
          }

          h2 {
            font-family: Dosis, sans-serif;
            font-size: 1.9rem;
            margin-bottom: 0.5rem;
            font-weight: 400;
            line-height: 1.3;
            color: #323d47;
            letter-spacing: 0.5px;
          }
          .lmt {
            font-size: 1rem;
            font-weight: 300;
            line-height: 1.8;
            color: #757575;
          }

          .step-content p {
            font-size: 1rem;
            line-height: 1.6;
            color: #757575;
            letter-spacing: 0.5px;
            font-family: Dosis, sans-serif !important;
          }
          .step-content h6 {
            font-weight: 400;
            color: #757575;
            line-height: 1.2;
            font-size: 1.23047rem;
            letter-spacing: 0.5px;
            font-family: Dosis, sans-serif !important;
          }
          .work {
            display: flex;
          }
        `}
      </style>
      <Footer />
    </>
  );
};

export default Features;
