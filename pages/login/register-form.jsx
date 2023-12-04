import React, { useState, useEffect } from "react";
import {
  firstUser,
  registerComapnyApi,
  sendOtp,
  verifyOtp,
} from "../../apis/apis";
import { useRouter } from "next/router";
import { MdDone } from "react-icons/md";
const RegistrationForm = () => {
  const getData = {
    gstin: "",
    company_name: "",
    contact_email: "",
    contact_password: "",
    contact_phone: "",
    contact_otp: "",
  };
  const route = useRouter();
  const [ragisterData, setRagisterData] = useState(getData);
  const [errors, setErrors] = useState({});
  const [time, setTime] = useState(30);
  const [tme, setTme] = useState(false);
  const [error, setEror] = useState(false);
  const [enableConfirm, setenableConfirm] = useState(true);

  const handleChange = (e) => {
    setRagisterData({ ...ragisterData, [e.target.name]: e.target.value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "", // Clear the error message for the field
    }));

    if (e.target.name === "contact_email") {
      validateEmail(e.target.value);
    }
  };

  useEffect(() => {
    if (tme == true) {
      setTime((time) => {
        if (time === 1) {
          setTme(false);
        }
        return time - 1;
      });
    }
  }, [tme]);

  const handleSendOTP = async (event) => {
    // Add code to send OTP
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const data = await sendOtp(ragisterData.contact_phone);
      if (data.message === "Mobile OTP Send") {
        setTme(false);
        setenableConfirm(false);
      } else if (data.message === "This number already exists") {
        alert("This number already exists");
        setEror(true);
        setTme(true);
      }
      setTime(30);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (ragisterData.gstin.length === 0) {
      errors.gstin = "Please enter gstin.";
    }
    if (ragisterData.company_name.length === 0) {
      errors.company_name = "Please enter company name.";
    }
    if (ragisterData.contact_phone.length !== 10) {
      errors.contact_phone = "Please enter number correctly.";
    }
    if (ragisterData.contact_password.length < 6) {
      errors.contact_password = "Password should be atleast 6 digit.";
    }
    if (ragisterData.contact_email.length === 0) {
      errors.contact_email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(ragisterData.contact_email)) {
      errors.contact_email = "Please enter a valid email address.";
    }
    // Add more validation rules for other fields

    return errors;
  };

  const validateEmail = (contact_email) => {
    if (!/\S+@\S+\.\S+/.test(contact_email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contact_email: "Please enter a valid email address....",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contact_email: "",
      }));
    }
  };

  const handleConfirmOTP = async (event) => {
    event.preventDefault();
    // Add code to confirm OTP
    if (window !== "undefined" && window.innerWidth < 550) {
      alert("Select dekstop view first on your browser");
      return; // Exit the function without further processing
    }
    const data = await verifyOtp(ragisterData.contact_otp);

    if (data.message === "Your can countinue") {
      const value = await registerComapnyApi(ragisterData);

      if (value.message === "Register Success") {
        const createUser = await firstUser();
        if (createUser.success == true) {
          localStorage.setItem("user", "logged");
          // Set the expiration time to 7 days from now
          const expirationTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
          localStorage.setItem("expirationTime", expirationTime.toString());

          route.push("/pricing");
        }
      } else alert(value.message);
    } else {
      alert(data.message);
    }
  };

  // const handleRegister = (event) => {
  //   event.preventDefault();
  // };

  return (
    <div className="mtop40 authentication-form">
      <h3 className="">Start your free trial</h3>
      <p className="">
        It's nice decision to select OdoAds cloud application <br /> to manage
        your media inventory, customers, campaign
         and many more.
      </p>
      <div className="row">
        <form
          id="registration_form"
          encType="multipart/form-data"
          noValidate="novalidate"
        >
          <div
            className="tab-content"
            style={{ padding: "15px 20px 10px !important" }}
          >
            <div className="customtab" id="register">
              <div className="form-group my-2">
                <label htmlFor="gstin">GST NO*</label>
                <input
                  type="text"
                  id="gstin"
                  name="gstin"
                  className="form-control input-lg c2"
                  value={ragisterData.gstin}
                  onChange={handleChange}
                />
                {errors.gstin && <span className="error">{errors.gstin}</span>}
              </div>

              <div className="form-group my-2">
                <label htmlFor="company_name">Company Name*</label>
                <input
                  type="text"
                  name="company_name"
                  id="company_name"
                  className="form-control input-lg c1 customvalidate"
                  value={ragisterData.company_name}
                  onChange={handleChange}
                />
                {errors.company_name && (
                  <span className="error">{errors.company_name}</span>
                )}
              </div>

              <div className="form-group my-2">
                <label htmlFor="contact_email">Email Address*</label>
                <input
                  type="email"
                  name="contact_email"
                  id="contact_email"
                  className="form-control input-lg c3 customvalidate"
                  value={ragisterData.contact_email}
                  onChange={handleChange}
                />
                {errors.contact_email && (
                  <span className="error">{errors.contact_email}</span>
                )}
              </div>
              <div className="form-group my-2">
                <label htmlFor="contact_password">Password*</label>
                <input
                  type="text"
                  name="contact_password"
                  id="contact_password"
                  className="form-control input-lg c3 customvalidate"
                  value={ragisterData.contact_password}
                  onChange={handleChange}
                />
                {errors.contact_password && (
                  <span className="error">{errors.contact_password}</span>
                )}
              </div>

              <div className="row  mb-3">
                <div className="col-md-6">
                  <label htmlFor="contact_phone">Phone*</label>
                  <div className="input-group">
                    <input
                      type="number"
                      name="contact_phone"
                      id="contact_phone"
                      className="form-control w-25 c4 customvalidate"
                      pattern="[1-9]{1}[0-9]{9}"
                      value={ragisterData.contact_phone}
                      onChange={handleChange}
                    />
                    <span className="input-group-btn">
                      <button
                        className="btn btn-info mt-0 c-btn"
                        id="send_otp"
                        onClick={handleSendOTP}
                      >
                        {enableConfirm == true ? (
                          "Send OTP"
                        ) : (
                          <MdDone className="text-light" />
                        )}
                      </button>
                    </span>
                  </div>
                  {errors.contact_phone && (
                    <span className="error">{errors.contact_phone}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="contact_otp">OTP</label>
                  <div className="input-group d-flex my-2 my-md-0">
                    <input
                      type="number"
                      name="contact_otp"
                      id="contact_otp"
                      className="form-control w-25 customvalidate"
                      value={ragisterData.contact_otp}
                      onChange={handleChange}
                    />
                    <span className="input-group-btn">
                      <button
                        className="btn btn-info mt-0 c-btn"
                        id="confirm_otp"
                        onClick={handleConfirmOTP}
                        disabled={enableConfirm == true}
                      >
                        Confirm OTP
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              {/* <button
        className="btn btn-info w-100 my-4"
        onClick={handleRegister}
      >
        Register
      </button> */}
            </div>
          </div>
        </form>
      </div>
      <style jsx>
        {`
          .c-btn {
            height: 34px !important;
            border-radius: 0 !important;
            border-top-right-radius: 4px !important;
            border-bottom-right-radius: 4px !important;
          }
          
          .authentication-form h3{
            margin: 5px 0 20px 0;
        
            color: #393939;
          }
          p {
            font-size: 14px;
            font-weight: 400;
            color: #9a9a9a;
            margin-bottom: 0px;
            
          }

          .form-control {
            line-height: 1.42857143;
          }
          .authentication-form .btn-info {
            color: #fff;
            background-color: #5EDF2D;
            border: 0;
            margin-top: 20px;
          }
          .btn {
            display: inline-block;
            padding: 6px 12px;
            margin-bottom: 0;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.42857143;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -ms-touch-action: manipulation;
            touch-action: manipulation;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            background-image: none;
            border: 1px solid transparent;
            border-radius: 4px;
          }
          .error_spam{
            color: red;
            font-weight:500;
          }
          .error{
            color: red;
            font-weight:500;
          }
          label {
            color: #838181;
            min-height: 20px;

            margin-bottom: 0;
            font-weight: 400;
            font-size: small;
            cursor: pointer;
          }
          @media screen and (max-width: 720px) {
          
            p {
              display:none;
            }
          }
          }
        `}
      </style>
    </div>
  );
};

export default RegistrationForm;
