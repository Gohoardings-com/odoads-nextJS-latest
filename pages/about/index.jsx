import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../components/static-header";
import Section3 from "../../components/home/section3";
import Footer from "@/components/footer";
import BubblesAnimation from "@/components/home/footer-banner";
import Floatingnavbar from "@/components/navbar/navbar-float";

const About = () => {
  const { asPath } = useRouter();
  return (
    <>
      <Head>
        <link rel="canonical" href={`https://www.odoads.com${asPath}`} />
        <title>
        About Us - Inventory Management Software Tools for OOH/DOOH Media Owners | OdoAds
        </title>
        <meta charSet="utf-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Here OdoAds provides OOH/DOOH Media Booking Management Software Tool for Media Owners/Vendors, That will help them to manage their all inventories and bookings. | OdoAds"
        />
        <meta
          name="google-site-verification"
          content="fLT70DRZGdH5FUdrS8w1k2Zg_VTzNJGDF9ie9v4FAzM"
        />
        <meta
          name="keywords"
          content="OOH Media Inventories Management Software, DOOH Media Inventories Management Software, OOH Media Campaign Management, DOOH Media Campaign Management, Media Booking Management Solutions, OOH/DOOH Media Monitoring Solutions | OdoAds"
        />
        <meta
          property="og:title"
          content="About Us - Inventory Management Software Tools for OOH/DOOH Media Owners | OdoAds"
        />
        <meta
          property="og:siteName"
          content="OdoAds - Management Software for OOH/DOOH Media Owners/Vendors"
        />
        <meta
          property="og:description"
          content="Here OdoAds provides OOH/DOOH Media Booking Management Software Tool for Media Owners/Vendors, That will help them to manage their all inventories and bookings. | OdoAds"
        />
        <meta property="og:type" content="en_US" />
        <meta
          property="og:image"
          href="https://odoads.com/imgs/14.jpg"
        />
        <meta property="og:url" href={asPath} />
        <meta property="og:property" content="en_US" />
        <meta
          property="twitter:title"
          content="About Us - Inventory Management Software Tools for OOH/DOOH Media Owners | OdoAds"
        />
        <meta
          property="twitter:siteName"
          content="OdoAds - Management Software for OOH/DOOH Media Owners/Vendors"
        />
        <meta
          property="twitter:description"
          content="Here OdoAds provides OOH/DOOH Media Booking Management Software Tool for Media Owners/Vendors, That will help them to manage their all inventories and bookings. | OdoAds"
        />
        <meta property="twitter:type" content="en_US" />
        <meta
          property="twitter:image"
          href="https://odoads.com/imgs/14.jpg"
        />
        <meta property="twitter:url" href={asPath} />
        <meta property="twitter:property" content="en_US" />
      </Head>
      <Header
        url="../../imgs/14.jpg"
        lead1="Time to know us"
        lead="Save your time by using professional technical hand."
        lead2="Save your time by using professional technical hand."
      />
      <Floatingnavbar/>
      <section className="section">
        <div className="container">
          <div className="row gap-y p-3  p-md-0">
            {/* <div className="col-md-4  text-md-end text-center p-3">
              <p className="lead-4">
                Passionate about creating a technical hand
              </p>
            </div> */}

            <div className="col-md-6 about_2 text-md-start text-center p-3 pb-md-0 ">
              <h6>Our Mission</h6>
              <p className="textt"> 
                We strive to provide an end-to-end solution for outdoor and
                indoor media business. We are a family catering a system at
                which you can handle all your media inventories, sales,
                invoicing, billing, availability, campaign and other related.
              </p>
            </div>

            <div className="col-md-6 text-md-start text-center about_2 p-3 pb-md-0">
              <h6>Our Vision</h6>
              <p className="textt">
                We aim to replace the traditional methodology of your media
                handling approach which is stressful and also time taking.
              </p>
            </div>
          </div>

        </div>
          <Section3 />
          <BubblesAnimation/>
      </section>
      <style jsx>{`
        .lead-4 {
          font-size: 1.65rem !important;
          font-weight: 300;
          line-height: 1.6;
          color: #757575;
          
        }
        .textt{
          font-size: .97rem;
          line-height: 1.8;
          color: #757575;
          letter-spacing: 0.5px;
          font-family: Dosis, sans-serif !important;
        }
        h6 {
          font-weight: 400;
          color: #757575;
          line-height: 1.4;
          font-size: 1.23047rem;
          letter-spacing: 0.5px;
          font-family: Dosis, sans-serif !important;
        }
      `}</style>
      <Footer/>
    </>
  );
};

export default About;
