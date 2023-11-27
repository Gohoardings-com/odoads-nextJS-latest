import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MdDone } from "react-icons/md";
import {
  changePassword,
  genrateforgetOtp,
  matchforgetotp,
  sendOtp,
  verifyOtp,
} from "../../apis/apis";

const ForgetForm = () => {
  const [contactPhone, setContactPhone] = useState("");
  const [contactOTP, setContactOTP] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [company, setCompany] = useState("");
  const [time, setTime] = useState(30);
  const [tme, setTme] = useState(false);
  const [error, setEror] = useState(false);
  const [changeBtn, setChangBtn] = useState(true);
  const [changeBtn2, setChangBtn2] = useState(true);
  const route = useRouter();

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

  //send otp api
  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (contactPhone !== "" && company !== "") {
      const data = await genrateforgetOtp(company, contactPhone);
      if (data.message === "Mobile OTP Send") {
        setChangBtn2(false);
      } else {
        alert(data.message);
      }
    } else {
      setEror(true);
      setTme(true);
    }
  };

  //confirm otp api
  const handleConfirmOTP = async (e) => {
    e.preventDefault();
    const data = await matchforgetotp(company, contactOTP);
    if (data.success == true) {
      setChangBtn(false);
      handleForget(e)
    } else if (data.success == false) {
      setEror(true);
    } else if (data.message == "Otp not matched") {
      alert(data.message);
    }
  };

  //change password api
  const handleForget = async (event) => {
    if (window !== "undefined" && window.innerWidth < 550) {
      alert("Select dekstop view first on your browser")
      return; // Exit the function without further processing
    }
    event.preventDefault();
    if (
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      const data = await changePassword(
        contactPhone,
        password,
        confirmPassword,
        company
      );
      if (data.success == true) {
        localStorage.setItem("user", "logged");
        // Set the expiration time to 7 days from now
        const expirationTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
        localStorage.setItem("expirationTime", expirationTime.toString());
        route.push("/admin");
      } else if (data.success == false) {
        setEror(true);
      }
    }
  };

  return (
    <div className="mtop40 authentication-form">
      <h3 className="text-center">Forgot Password</h3>

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
              <div className="form-group my-2 mt-0">
                <input
                  type="text"
                  name="company"
                  id="company"
                  className="form-control input-lg c1 customvalidate"
                  placeholder="Comapnay name*"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                {error == true && company.length < 1 && (
                  <small className="p-0 text-danger text-small  ">
                    Company Name Requried
                  </small>
                )}
              </div>
              <div className="form-group my-2">
                <input
                  type="text"
                  name="password"
                  id="password"
                  className="form-control input-lg c1 customvalidate"
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error == true && password.length <= 6 && (
                  <small className="p-0 text-danger text-small  ">
                    password should be atleast 6 digit
                  </small>
                )}
              </div>
              <div className="form-group my-2">
                <input
                  type="text"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="form-control input-lg c3 customvalidate"
                  placeholder="Confirm Password*"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {password !== confirmPassword && (
                  <small className="p-0 text-danger text-small  ">
                    password not matched with confirmpassword
                  </small>
                )}
              </div>
              <div className="row  my-2 mb-4">
                <div className="col-md-6">
                  <div className="input-group">
                    <input
                      type="number"
                      name="contact_phone"
                      id="contact_phone"
                      className="form-control w-25 c4 customvalidate"
                      placeholder="Phone*"
                      pattern="[1-9]{1}[0-9]{9}"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                    />
                    <span className="input-group-btn">
                      <button
                        className="btn btn-info mt-0 c-btn"
                        id="send_otp"
                        onClick={handleSendOTP}
                      >
                        {changeBtn2 == true ? (
                          "Send OTP"
                        ) : (
                          <MdDone className="text-success" />
                        )}
                      </button>
                    </span>
                    <span
                      id="error_mobile"
                      className="validate invisible"
                      style={{ position: "absolute", marginTop: "42px" }}
                    ></span>
                  </div>
                  {error == true && contactPhone.length !== 10 && (
                    <small className="p-0 text-danger text-small  ">
                      Type number correctly
                    </small>
                  )}
                </div>

                <div className="col-md-6">
                  <div className="input-group d-flex my-2 my-md-0">
                    <input
                      type="number"
                      name="contact_otp"
                      id="contact_otp"
                      className="form-control w-25 customvalidate"
                      placeholder="OTP"
                      value={contactOTP}
                      onChange={(e) => setContactOTP(e.target.value)}
                    />
                    <span className="input-group-btn">
                      <button
                        className="btn btn-info mt-0 c-btn"
                        id="confirm_otp"
                        onClick={handleConfirmOTP}
                        disabled={changeBtn2 == true}
                      >
                        {changeBtn ? (
                          "Confirm OTP"
                        ) : (
                          <MdDone className="text-success" />
                        )}
                      </button>
                    </span>
                  </div>
                </div>
              </div>
         

              {/* <button
                className="btn btn-info w-100 my-3 mt-2"
                onClick={handleForget}
                disabled={changeBtn == true}
              >
                Change Password
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
          .authentication-form {
            background: #1a2038;
            opacity: 0.9;
            border: none;
            width: 700px;
            height: auto;
            border-radius: 2px;
          }
          .authentication-form h3 {
            margin: 0 0 25px 0;
            padding: 10px 0;
            color: #ffb433;
            border-bottom: dashed 1px rgba(255, 180, 109, 0.9);
            text-transform: none;
          }
          p {
            padding-top: 10px;
            color: #ffb433;

            text-transform: none;
          }
          p {
            font-size: 10px;
            font-weight: 400;
            color: #9a9a9a;
            margin-bottom: 0px;
            text-align: center;
          }

          .form-control {
            display: block;
            width: 100%;
            height: 34px;
            padding: 6px 12px;
            font-size: 14px;
            line-height: 1.42857143;
            color: black;
            background-color: #fff;
            background-image: none;
            border: 1px solid #ccc;
            border-radius: 4px;
            -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
            -webkit-transition: border-color ease-in-out 0.15s,
              -webkit-box-shadow ease-in-out 0.15s;
            -o-transition: border-color ease-in-out 0.15s,
              box-shadow ease-in-out 0.15s;
            transition: border-color ease-in-out 0.15s,
              box-shadow ease-in-out 0.15s;
          }
          .authentication-form .btn-info {
            color: #fff;
            background-color: #ffb433;
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
          @media screen and (max-width: 500px) {
            .authentication-form {
              width: 94vw;
            }
            p {
              display:none;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ForgetForm;
