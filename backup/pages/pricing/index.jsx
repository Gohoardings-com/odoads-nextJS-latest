import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../components/static-header";
import Footer from "@/components/footer";
import Floatingnavbar from "@/components/navbar/navbar-float";

const Pricing = () => {
  const { asPath } = useRouter();
  const [state, setState] = useState(true);
  const [nstate, setNstate] = useState(false);
  return (
    <>
      <Head>
        <link rel="canonical" href={`https://www.odoads.com${asPath}`} />
        <title>
          Manage Your Outdoor Advertising Business with Our Simple Software |
          Odoads
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Our Simple Software Will Help you To Manage Your Outdoor Advertising Business. It Addresses Specific Needs of Sales, Accounting & Inventory Management, Operation in Indoor & Outdoor Advertising Agencies. It Provides Comprehensive OOH Media Management Solution for an OOH Advertising Company. Media Owners face a lot of Challengs in day to day in managing their Media Inventories. We offer you an efficient Media Planning tool to make easier | OdoAds"
        />
        <meta
          name="google-site-verification"
          content="fLT70DRZGdH5FUdrS8w1k2Zg_VTzNJGDF9ie9v4FAzM"
        />
        <meta
          name="keywords"
          content="DOOH Media Campaign Management, Media Booking Management Solutions, Software for OOH Media Owners, CRM For Hoardings Management, ERP for Hoardings Management, OOH Inventory Management, OOH Campaign Managment Application | OdoAds"
        />
        <meta
          property="og:title"
          content="Manage Your Outdoor Advertising Business with Our Simple Software | Odoads"
        />
        <meta
          property="og:siteName"
          content="Pricing - Management Software for OOH/DOOH Media Owners/Vendors"
        />
        <meta
          property="og:description"
          content="Our Simple Software Will Help you To Manage Your Outdoor Advertising Business. It Addresses Specific Needs of Sales, Accounting & Inventory Management, Operation in Indoor & Outdoor Advertising Agencies. It Provides Comprehensive OOH Media Management Solution for an OOH Advertising Company. Media Owners face a lot of Challengs in day to day in managing their Media Inventories. We offer you an efficient Media Planning tool to make easier | OdoAds"
        />
        <meta property="og:type" content="en_US" />
        <meta property="og:image" href="https://odoads.com/imgs/17.jpg" />
        <meta property="og:url" href={asPath} />
        <meta property="og:property" content="en_US" />
        <meta
          property="twitter:title"
          content="Manage Your Outdoor Advertising Business with Our Simple Software | Odoads"
        />
        <meta
          property="twitter:siteName"
          content="Pricing - Management Software for OOH/DOOH Media Owners/Vendors"
        />
        <meta
          property="twitter:description"
          content="Our Simple Software Will Help you To Manage Your Outdoor Advertising Business. It Addresses Specific Needs of Sales, Accounting & Inventory Management, Operation in Indoor & Outdoor Advertising Agencies. It Provides Comprehensive OOH Media Management Solution for an OOH Advertising Company. Media Owners face a lot of Challengs in day to day in managing their Media Inventories. We offer you an efficient Media Planning tool to make easier | OdoAds"
        />
        <meta property="twitter:type" content="en_US" />
        <meta property="twitter:image" href="https://odoads.com/imgs/17.jpg" />
        <meta property="twitter:url" href={asPath} />
        <meta property="twitter:property" content="en_US" />
      </Head>
      <Floatingnavbar/>
      <Header
        url="../../imgs/17.jpg"
        lead1="Choose the best plan for your business"
        lead="Save your time by using professional technical hand."
        lead2="Plans for teams and businesses of every stage, shape and size."
      />
      <section id="section-pricing" className="section bg-gray ">
        <div className="container">
          <header className="section-header mb-0 text-center ">
            <h2 className="lead">Affordable Pricing</h2>
            <hr style={{ borderTopColor: "#919191", marginTop: "10px" }} />
          </header>

          <div className="text-center my-3">
            <button
              className="btnn btn-m m-2 my-0"
              aria-expanded={state}
              onClick={() => {
                setState(true), setNstate(false);
              }}
            >
              MONTHLY
            </button>
            <button
              className="btnn btn-n m-2 my-0"
              aria-expanded={nstate}
              onClick={() => {
                setState(false), setNstate(true);
              }}
            >
              YEARLY
            </button>
          </div>
          <br />

          <div className="row gap-y text-center">
            <div className="col-md-4">
              <div className="pricing-1">
                <div
                  className="card-img-top text-white bg-img h-200 d-flex align-items-center"
                  style={{
                    backgroundImage: "url(../../imgs/8.jpg)",
                  }}
                  data-overlay="2"
                >
                  <div className="position-relative w-100">
                    <p className="lead-4 text-uppercase fw-600 ls-1 mb-0">
                      Starter
                    </p>
                  </div>
                </div>
                <h2 className="price" style={{ lineHeight: "1.2" }}>
                  <span style={{ fontSize: "40px" }}>free</span>
                </h2>
                <p className="small text-lighter">
                  <span>Forever!</span>
                </p>
                <div className="text-muted">
                  <small>5 Users</small>
                  <br />
                  <small>5 GB Cloud Server Space</small>
                  <br />
                  <small>No Reporting Dashboard</small>
                  <br />
                  <small>45 Inventories</small>
                  <br />
                  <small>Customers Managment</small>
                  <br />
                  <small>No Landlord Management</small>
                  <br />
                  <small>No Leads Managments</small>
                  <br />
                  <small>Email &amp; In-App Support</small>
                  <br />
                  <small>No Invoicing With GST Support</small>
                  <br />
                  <small>Campaign Managment</small>
                  <br />
                  <small>Support</small>
                  <br />
                  <small>Meeting Scheduling</small>
                  <br />
                  <small>No Business Growth Support</small>
                  <br />
                </div>
                <br />
                <p className="text-center py-3">
                  <a className="btn btn-outline-primary" href="/login">
                    Get started
                  </a>
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="pricing-1 popular"
                style={{ backgroundColor: "#dde9ef" }}
              >
                <div
                  className="card-img-top text-white bg-img h-200 d-flex align-items-center"
                  style={{
                    backgroundImage: "url(../../imgs/3.jpg)",
                  }}
                  data-overlay="1"
                >
                  <div className="position-relative w-100">
                    <p className="lead-4 text-uppercase fw-600 ls-1 mb-0">
                      Professional
                    </p>
                  </div>
                </div>
                <h2 className="price text-success" style={{ lineHeight: "1" }}>
                  <span
                    className="price-unit"
                    style={{ marginRight: "-11px", marginTop: "30px" }}
                  >
                    <i className="fa fa-inr"></i>
                  </span>
                  <span style={{ fontSize: "40px" }}>{nstate? <>79,200</>:<>6,000</> }</span>
                </h2>
                <p className="small text-lighter">
                  <span> {nstate? "Year": "Monthly" }</span>
                </p>

                <div className="text-muted">
                  <small>15 Users</small>
                  <br />
                  <small>10 GB Cloud Server Space</small>
                  <br />
                  <small>Reporting Dashboard</small>
                  <br />
                  <small>200 Inventories</small>
                  <br />
                  <small>Customers Managment</small>
                  <br />
                  <small>Landlord Management</small>
                  <br />
                  <small>Leads Managments</small>
                  <br />
                  <small>Email &amp; In-App Support</small>
                  <br />
                  <small>Invoicing With GST Support</small>
                  <br />
                  <small>Campaign Managment</small>
                  <br />
                  <small>Support</small>
                  <br />
                  <small>Meeting Scheduling</small>
                  <br />
                  <small>Business Growth Support</small>
                  <br />
                </div>

                <br />

                <p className="text-center py-3">
                  <a className="btn btn-success" href="login">
                    Get started
                  </a>
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="pricing-1">
                <div
                  className="card-img-top text-white bg-img h-25 d-flex align-items-center"
                  style={{
                    backgroundImage: "url(../../imgs/11.jpg)",
                  }}
                  data-overlay="2"
                >
                  <div className="position-relative w-100">
                    <p className="lead-4 text-uppercase fw-600 ls-1 mb-0">
                      Enterprise
                    </p>
                  </div>
                </div>
                <h2 className="price" style={{ lineHeight: "1" }}>
                  <span
                    className="price-unit"
                    style={{ marginRight: "-11px", marginTop: "30px" }}
                  >
                    <i className="fa fa-inr"></i>
                  </span>
                  <span
                    data-bind-radio="pricing"
                    data-monthly="12,000"
                    style={{ fontSize: "40px" }}
                  >
                    {nstate? <>1,32,000 </>:<>11,000</>}
                  </span>
                </h2>
                <p className="small text-lighter">
                  <span
                    data-bind-radio="pricing"
             
                  >
                   {nstate? "Year": "Monthly" }
                  </span>
                </p>

                <div className="text-muted">
                  <small>Unlimited</small>
                  <br />
                  <small>Unlimited</small>
                  <br />
                  <small>Reporting Dashboard</small>
                  <br />
                  <small>Unlimited</small>
                  <br />
                  <small>Customers Managment</small>
                  <br />
                  <small>Landlord Management</small>
                  <br />
                  <small>Leads Managments</small>
                  <br />
                  <small>Email &amp; In-App Support</small>
                  <br />
                  <small>Invoicing With GST Support</small>
                  <br />
                  <small>Campaign Managment</small>
                  <br />
                  <small>Support</small>
                  <br />
                  <small>Meeting Scheduling</small>
                  <br />
                  <small>Business Growth Support</small>
                  <br />
                </div>

                <br />

                <p className="text-center py-3">
                  <a className="btn btn-outline-primary" href="/login">
                    Get started
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container p-3">
          <header className="section-header text-center">
            <small>FAQ</small>
            <h2 className="lead">Frequently Asked Questions</h2>
            <hr style={{ borderTopColor: "#919191", marginTop: "10px" }} />
            <p className="textt fw-light">
              Got a question? We've got answers. If you have some other
              questions, contact us using email.
            </p>
          </header>

          <div className="row gap-y mt-4">
            <div className="col-md-6 col-xl-4">
              <h5>Is this a secure site for purchases?</h5>
              <p>
                Absolutely! We work with top payment companies which guarantees
                your safety and security. All billing information is stored on
                our payment processing partner which has the most stringent
                level of certification available in the payments industry.
              </p>
            </div>

            <div className="col-md-6 col-xl-4">
              <h5>Can I cancel my subscription?</h5>
              <p>
                You can cancel your subscription anytime in your account. Once
                the subscription is cancelled, you will not be charged next
                month. You will continue to have access to your account until
                your current subscription expires.
              </p>
            </div>

            <div className="col-md-6 col-xl-4">
              <h5>How long are your contracts?</h5>
              <p>
                Currently, we only offer monthly subscription. You can upgrade
                or cancel your monthly account at any time with no further
                obligation.
              </p>
            </div>

            <div className="col-md-6 col-xl-4">
              <h5>Can I update my card details?</h5>
              <p>
                Yes. Go to the billing section of your dashboard and update your
                payment information.
              </p>
            </div>

            <div className="col-md-6 col-xl-4">
              <h5>Can I request a refund?</h5>
              <p>
                Unfortunately, not. We do not issue full or partial refunds for
                any reason.
              </p>
            </div>

            <div className="col-md-6 col-xl-4">
              <h5>Can I try your service for free?</h5>
              <p>
                Of course! We’re happy to offer a free plan to anyone who wants
                to try our service.
              </p>
            </div>
          </div>
        </div>
      </section>
      <style jsx>
        {`
         .textt{
          font-size: 1.15rem !important;
          line-height: 1.9 !important;
          color: #757575 !important;
          letter-spacing: .5px !important;
        }
          h2 {
            font-family: Dosis, sans-serif;
            font-size: 2.10938rem;
            margin-bottom: 0.5rem;
            font-weight: 400;
            line-height: 1.5;
            color: #323d47;
            letter-spacing: 0.5px;
          }
          p {
            font-size: 0.92rem !important;
            font-weight: 300;
            line-height: 1.9;
            color: #757575;
          }
          h5 {
            color: #323d47;
            letter-spacing: 0.5px;
            font-size: 1rem !important;
            margin-bottom: 0.5rem;
            font-family: Dosis, sans-serif;
            font-weight: 400;
          }
          .btnn {
            font-size: 11px;
            padding: 8px 26px 6px;
            letter-spacing: 1.7px;
            text-transform: uppercase;
            border-radius: 10rem;
            outline: none;
            -webkit-transition: 0.15s linear;
            transition: 0.15s linear;
            border: none;
          }
          .btnn[aria-expanded="true"] {
            background-color: #628895;
            color: white;
          }
          .btn {
            font-size: 11px;
            padding: 8px 26px 6px;
            letter-spacing: 1.7px;
            text-transform: uppercase;
            border-radius: 2px;
            outline: none;
            -webkit-transition: 0.15s linear;
            transition: 0.15s linear;
          }
          .btn-outline-primary {
            background-color: transparent;
            color: #67adff;
            border: 1px solid #67adff;
          }
          .btn-outline-primary:hover {
            background-color: #67adff;
            color: white;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
              rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
          }
          .btn-success {
            background-color: #3cd458;
            border: 1px solid #3cd458;
          }
          .btn-success:hover {
            box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
              rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
          }
          h5 {
            font-weight: 400;
            font-size: 0.81rem;
          }
          p {
            font-size: 0.78rem;
            line-height: initial;
          }
        `}
      </style>
      <Footer/>
    </>
  );
};

export default Pricing;
