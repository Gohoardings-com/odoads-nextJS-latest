import React, { useState } from "react";
import { loginApi } from "../../apis/apis";
import { useRouter } from "next/router";
import ForgetForm from "./forget-form";

const LoginForm = ({setForgeted}) => {
  const router = useRouter();
  const [forget, setForget] = useState(false);
  if(setForgeted ){

    setForgeted(forget);
  }
  const [formSubmit, setFormSubmit] = useState(false);
  const forgetPassword = () => setForget(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    company: "",
    remember: false,
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: inputValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (window !== "undefined" && window.innerWidth < 550) {
      alert("Select dekstop view first on your browser");
      return; // Exit the function without further processing
    }

    if (
      formData.email !== "" &&
      formData.password !== "" &&
      formData.company !== ""
    ) {
      const value = await loginApi(formData);
      if (value.success == true) {
        localStorage.setItem("user", "logged");

        // Set the expiration time to 7 days from now
        const expirationTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
        localStorage.setItem("expirationTime", expirationTime.toString());

        router.push("/admin");
      } else if (value.message == "Select Plan") {
        localStorage.setItem("user", "logged");

        // Set the expiration time to 7 days from now
        const expirationTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
        localStorage.setItem("expirationTime", expirationTime.toString());

        router.push("/pricing");
      } else if (value.message !== "") {
        alert(value.message);
      }
    } else {
      setFormSubmit(true);
    }
  };

  return (
    <>
      {forget ? (
        <>
          <ForgetForm />
        </>
      ) : (
        <>
          <div className="authentication-form">
            <h3 className="">Login</h3>
            <p className="">
              Welcome back! Log in to your OdoAds Cloud account <br/>to access your
              media inventory, manage customers, track<br/> campaigns, and more.
              We're thrilled to have you back on board.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="company" className="control-label my-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  autoFocus={true}
                  value={formData.company}
                  onChange={handleInputChange}
                  autoComplete="email" // Add autoComplete attribute
                  className={`form-control ${
                    formSubmit && formData.company === "" ? "is-invalid" : ""
                  }`}
                />
                {formSubmit && formData.company === "" && (
                  <div className="invalid-feedback">
                    Please enter your Company Name.
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email" className="control-label my-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoFocus={true}
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email" // Add autoComplete attribute
                  className={`form-control ${
                    formSubmit && formData.email === "" ? "is-invalid" : ""
                  }`}
                />
                {formSubmit && formData.email === "" && (
                  <div className="invalid-feedback">
                    Please enter your email.
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password" className="control-label  my-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`form-control ${
                    formSubmit && formData.password === "" ? "is-invalid" : ""
                  }`}
                />
                {formSubmit && formData.password === "" && (
                  <div className="invalid-feedback">
                    Please enter your password.
                  </div>
                )}
              </div>
              <div className="checkbox">
                <label htmlFor="remember" className=" mt-2">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleInputChange}
                  />{" "}
                  Remember me
                </label>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-info w-100 ">
                  Login
                </button>
              </div>
              <div className="form-group mt-2 mb-2">
                <a className="" onClick={forgetPassword}>
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>
        </>
      )}

      <style jsx>
        {`
          .authentication-form h3 {
            margin: 5px 0 10px 0;

            color: #393939;
          }
          .form-control {
            line-height: 1.42857143;
          }
          .authentication-form .btn-info {
            color: #fff;
            background-color: #5edf2d;
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
          .authentication-form a,
          label {
            color: #838181;
            min-height: 20px;

            margin-bottom: 0;
            font-weight: 400;
            font-size: small;
            cursor: pointer;
          }
          p {
            font-size: 14px;
            font-weight: 400;
            color: #9a9a9a;
            margin-bottom: 14px;
          }

          @media screen and (max-width: 720px) {
           p{
            display:none;
           }
          }
        `}
      </style>
    </>
  );
};

export default LoginForm;
