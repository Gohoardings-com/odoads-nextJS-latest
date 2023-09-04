import React from "react";
import Header from "../../components/static-header";
import Footer from "@/components/footer";
import Floatingnavbar from "@/components/navbar/navbar-float";
const Disclaimer = () => {
    return (
      <>
      <Header
        url="../../imgs/business-people.jpg"
        lead1="Disclaimer"
        lead=""
        lead2=""
      />
      <Floatingnavbar/>
      <main className="main-content">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-xl-12 mr-md-auto pt-8 pb-8">
            <article>
       
              <p>
                If you require any more information or have any questions about our site's disclaimer, please feel free
                to contact us by email at notification@odoads.com
              </p>
              <p>
                All the information on this website - https://odoads.com/ - is published in good faith and for general
                information purpose only. odoads.com does not make any warranties about the completeness, reliability and
                accuracy of this information. Any action you take upon the information you find on this website
                (odoads.com), is strictly at your own risk. odoads.com will not be liable for any losses and/or damages in
                connection with the use of our website. Our Disclaimer was generated with the help of the Disclaimer
                Generator and the Terms and Conditions Template.
              </p>
              <p>
                From our website, you can visit other websites by following hyperlinks to such external sites. While we
                strive to provide only quality links to useful and ethical websites, we have no control over the content
                and nature of these sites. These links to other websites do not imply a recommendation for all the content
                found on these sites. Site owners and content may change without notice and may occur before we have the
                opportunity to remove a link that may have gone 'bad'.
              </p>
              <p>
                Please be also aware that when you leave our website, other sites may have different privacy policies and
                terms that are beyond our control. Please be sure to check the Privacy Policies of these sites as well as
                their "Terms of Service" before engaging in any business or uploading any information.
              </p>
              <h6 id="extended-license" data-provide="anchor">
                Consent<a className="anchor" href="#extended-license"></a>
              </h6>
              <p>By using our website, you hereby consent to our disclaimer and agree to its terms.</p>
              <h6 id="extended-license" data-provide="anchor">
                Update<a className="anchor" href="#extended-license"></a>
              </h6>
              <p>Should we update, amend or make any changes to this document, those changes will be prominently posted here.</p>
            </article>
          </div>
        </div>
      </div>
        <style jsx>
          {
            `
            .main-content{
              margin: 0;
              font-family: "Open Sans",sans-serif;
              font-size: .8.8rem;
              font-weight: 300;
              line-height: 1.6;
             
              text-align: left;
              background-color: #fff;
          }
          p{
            font-size: .8rem;
            color: #757575;
          }
            `
          }
        </style>
      </main>
      <Footer/>
      </>
    );
  };
  
  export default Disclaimer;
  