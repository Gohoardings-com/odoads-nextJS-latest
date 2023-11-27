import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ContactForm from "../../components/contact-form";
import Header from "../../components/static-header";
import Footer from "@/components/footer";
import Floatingnavbar from "@/components/navbar/navbar-float";

const Contact = () => {
  const { asPath } = useRouter();
  return (
    <>
      <Head>
        <link rel="canonical" href={`https://www.odoads.com${asPath}`} />
        <title>
          Get in touch with us to know more about OOH/DOOH Media Inventories
          Management Software | OdoAds
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Interested in a Web Demo or have any Queries about the OdoAds Management Software? Submit an inquiry or give us a call today"
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
          content="Get in touch with us to know more about OOH/DOOH Media Inventories Management Software | OdoAds"
        />
        <meta
          property="og:siteName"
          content="Contact Us - Management Software for OOH/DOOH Media Owners/Vendors"
        />
        <meta
          property="og:description"
          content="Interested in a Web Demo or have any Queries about the OdoAds Management Software? Submit an inquiry or give us a call today"
        />
        <meta property="og:type" content="en_US" />
        <meta
          property="og:image"
          href="https://odoads.com/imgs/contact-bg.jpg"
        />
        <meta property="og:url" href={asPath} />
        <meta property="og:property" content="en_US" />
        <meta
          property="twitter:title"
          content="Get in touch with us to know more about OOH/DOOH Media Inventories Management Software | OdoAds"
        />
        <meta
          property="twitter:siteName"
          content="Contact Us - Management Software for OOH/DOOH Media Owners/Vendors"
        />
        <meta
          property="twitter:description"
          content="Interested in a Web Demo or have any Queries about the OdoAds Management Software? Submit an inquiry or give us a call today"
        />
        <meta property="twitter:type" content="en_US" />
        <meta
          property="twitter:image"
          href="https://odoads.com/imgs/contact-bg.jpg"
        />
        <meta property="twitter:url" href={asPath} />
        <meta property="twitter:property" content="en_US" />
      </Head>
      <Floatingnavbar />

      <Header
        url="../../imgs/contactBanner.jpg"
        lead1="Contact Us"
        lead2="You have come this far-why not get in touch?"
      />

      <section className="section bg-gray text-center  p-3 p-md-0 my-5">
        <div className="container">
          <div className="row mt-md-4">
            <div className="col-12 col-md-4 text-center">
              <img src="../../imgs/telephone.png" alt="..." className="img-2" />
              <h6 className="card-icon-text fw-bold mt-2 text-dark">Call</h6>
              <h6 className="card-icon-text mt-4">
                Call for any information and support
                <p className="mt-3">
                  <a href="tel:+917777871717">+91 7777871717</a>
                </p>
              </h6>
            </div>
            <div className="col-12 col-md-4 text-center border-box">
              <img src="../../imgs/mail.png" alt="..." className="img-2" />
              <h6 className="card-icon-text fw-bold mt-2 text-dark">Email</h6>
              <h6 className="card-icon-text mt-4">
                Email for any offical help and support <br />
                <p className="mt-3">
                  {" "}
                  <a href="mailto:sales@odoads.com" className="">
                    sales@odoads.com
                  </a>
                </p>
                <a href="mailto:info@odoads.com" className="">
                  info@odoads.com
                </a>
              </h6>
            </div>
            <div className="col-12 col-md-4 text-center">
              <img src="../../imgs/location.png" alt="..." className="img-2" />
              <h6 className="card-icon-text fw-bold mt-2 text-dark">Meet</h6>
              <h6 className="card-icon-text mt-4">
                Let's have a coffee together
              </h6>
              <a
                href="https://maps.google.com/maps?ll=28.545099,77.333688&amp;z=16&amp;t=m&amp;hl=en&amp;gl=IN&amp;mapclient=embed&amp;daddr=ODOads%2082%2C%20E-Block%20Rd%20Sector%206%20Noida%2C%20Uttar%20Pradesh%20201301@28.5450993,77.3336882"
                className="
"
              >
                82, E-Block Rd, Sector 6, Noida
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-3 mb-md-5 p-3 p-md-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.820852041051!2d77.33111327437544!3d28.545103988047586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce569d4819d5d%3A0x8d4cc33e17dc1524!2sODOads!5e0!3m2!1sen!2sin!4v1686740895879!5m2!1sen!2sin"
          style={{ width: "100%", height: "360px" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <ContactForm />
      </section>
      <Footer />
      <style jsx>
        {`
          .img-2 {
            height: 40px;
            width: auto;
          }
          .card-icon-text {
            font-size: small;
            color: #818283;
          }

          .border-box {
            border-right: 2px solid #7c7878;
            border-left: 2px solid #7c7878;
          }
          @media screen and (max-width: 720px) {
            .border-box {
              margin: 20px 0px;
              border: none;
            }
          }
        `}
      </style>
    </>
  );
};

export default Contact;
