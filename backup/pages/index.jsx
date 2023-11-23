import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Banner from "../components/home/banner";
import Section1 from "../components/home/section1";
import Section2 from "../components/home/section2";
import Section3 from "../components/home/section3";
import BubblesAnimation from "../components/home/footer-banner";
import Footer from "@/components/footer";
import Floatingnavbar from "@/components/navbar/navbar-float";

export default function Home() {
  const { asPath } = useRouter();
  return (
    <>
      <Head>
        <link rel="canonical" href={`https://www.odoads.com${asPath}`} />
        <title>
          Outdoor Advertising Media Management Software. OOH, DOOH, ERP, CRM
          Software for OOH/DOOH Advertising Company - OdoAds.com
        </title>
        <meta charSet="utf-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Outdoor Advertising Media Agency Magement Software for Hoardings owner, OOH, DOOH, ERP, CRM Solution for OOH/DOOH Media Owners. Advertising Booking Software, OOH Media Management Software, DOOH Media Management Software, Hoardings Booking Management Applications"
        />
        <meta
          name="google-site-verification"
          content="fLT70DRZGdH5FUdrS8w1k2Zg_VTzNJGDF9ie9v4FAzM"
        />
        <meta
          name="keywords"
          content="DOOH Media Management Software, OOH Media Management Sofware, OOH Media Booking Management Software, DOOH Media Booking Management Software, Software for OOH Media Owners, CRM For Hoardings Management, ERP for Hoardings Management, OOH Inventory Management, OOH Campaign Managment Application"
        />
        <meta
          property="og:title"
          content="Outdoor Advertising Media Management Software. OOH, DOOH, ERP, CRM Software for OOH/DOOH Advertising Company - OdoAds.com"
        />
        <meta
          property="og:siteName"
          content="OdoAds - Management Software for OOH/DOOH Media Owners/Vendors"
        />
        <meta
          property="og:description"
          content="Outdoor Advertising Media Agency Magement Software for Hoardings owner, OOH, DOOH, ERP, CRM Solution for OOH/DOOH Media Owners. Advertising Booking Software, OOH Media Management Software, DOOH Media Management Software, Hoardings Booking Management Applications."
        />
        <meta property="og:type" content="en_US" />
        <meta
          property="og:image"
          href="https://odoads.com/imgs/home-blocks-and-elements.jpg"
        />
        <meta property="og:url" href={asPath} />
        <meta property="og:property" content="en_US" />
        <meta
          property="twitter:title"
          content="Outdoor Advertising Media Management Software. OOH, DOOH, ERP, CRM Software for OOH/DOOH Advertising Company - OdoAds.com"
        />
        <meta
          property="twitter:siteName"
          content="OdoAds - Management Software for OOH/DOOH Media Owners/Vendors"
        />
        <meta
          property="twitter:description"
          content="Outdoor Advertising Media Agency Magement Software for Hoardings owner, OOH, DOOH, ERP, CRM Solution for OOH/DOOH Media Owners. Advertising Booking Software, OOH Media Management Software, DOOH Media Management Software, Hoardings Booking Management Applications."
        />
        <meta property="twitter:type" content="en_US" />
        <meta
          property="twitter:image"
          href="https://odoads.com/imgs/home-blocks-and-elements.jpg"
        />
        <meta property="twitter:url" href={asPath} />
        <meta property="twitter:property" content="en_US" />
      </Head>
      <Banner />
      <div className="container">
        <Section1 />
      </div>
      <Floatingnavbar/>
      <Section2 />
      <Section3 />
      <BubblesAnimation />
      <Footer />
    </>
  );
}
