import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import {hideOffcanvas } from '../../../redux/userActions'; 

const Footer = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleMenuClickClose = () => {
    dispatch(hideOffcanvas());
  };
  const show = useSelector(state => state.show); 
  return (
    <>
      <footer className="footer container-xxl   container-xl container-lg container-md w-100">
        <div className="container pb-3 pt-3">
          <div className="row gap-y align-items-center ">
            <div className="col-md-6 col-9 ps-3 ps-md-0">
              <p style={{ margin: 0 }}>
                © {new Date().getFullYear()} Odoads by{" "}
                <Link href="https://www.gohoardings.com">Gohoardings</Link>, All
                rights reserved.
              </p>
              <Link href="/disclaimer" style={{ fontSize: "10px" }}>
                Disclaimer
              </Link>{" "}
              |{" "}
              <Link href="/privacy-policy" style={{ fontSize: "10px" }}>
                Privacy Policy
              </Link>
            </div>

            <div className="col-md-6 col-3  text-end ">
              <div className="social">
                <Link
                  href="https://www.facebook.com/odoads"
                  target="_blank"
                  className="p-2"
                >
                  <FaFacebookF style={{ fontSize: "13px", color: "#A9AAAE" }} />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/odoads"
                  target="_blank"
                  className="p-2"
                >
                  <FaLinkedinIn
                    style={{ fontSize: "15px", color: "#A9AAAE" }}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Offcanvas show={show} onHide={handleMenuClickClose}>
        <Offcanvas.Header closeButton>
          <p className="nav-logo ms-3 mb-0">
            <img
              src="../../imgs/black_logo-light.png"
              onClick={() => router.push("/")}
              style={{ cursor: "pointer" }}
              className=""
            />
          </p>{" "}
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-group ">
            <li
              className="list-group-item"
              data-bs-dismiss="offcanvas"
              onClick={() => router.push("/about")}
            >
              About
            </li>
            <li
              className="list-group-item"
              data-bs-dismiss="offcanvas"
              onClick={() => router.push("/features")}
            >
              Features
            </li>
            <li
              className="list-group-item"
              data-bs-dismiss="offcanvas"
              onClick={() => router.push("/pricing")}
            >
              Pricing
            </li>
            <li
              className="list-group-item"
              data-bs-dismiss="offcanvas"
              onClick={() => router.push("/contact")}
            >
              Contact
            </li>
            <li
              className="list-group-item"
              data-bs-dismiss="offcanvas"
              onClick={() => router.push("/privacy-policy")}
            >
              Privacy policy
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>

      <style jsx>
        {`
          .footer {
            margin: 0;
            font-family: "Open Sans", sans-serif;
            font-size: 0.9375rem;
            font-weight: 300;
            line-height: 1.5;
            color: #757575;
            background-color: #fff;
          }
          .list-group-item {
            min-height: inherit;
            line-height: inherit;
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            font-size: 0.95rem;
            text-transform: none;
            color: rgba(117, 117, 117, 0.8);
          }
        `}
      </style>
    </>
  );
};

export default Footer;
