import React, { useState } from "react";
import LoginForm from "./login-form";
import RegistrationForm from "./register-form";

const Login = () => {
  const [isLgn, setIsLgn] = useState(false);
  const toggleForm = () => {
    setIsLgn(!isLgn);
  };
  return (
    <>
      <div className="full-container container-fluid ">
        <div className="row">
          {!isLgn ? (
            <>
              <LoginForm />
            </>
          ) : (
            <>
              {" "}
              <RegistrationForm />{" "}
            </>
          )}

          <div className="float-right">
            {isLgn ? (
              <>
                {" "}
                <a className=" text-light" onClick={toggleForm}>
            
                  Already have an account?
                </a>
              </>
            ) : (
              <>
                {" "}
                <a className="text-light" onClick={toggleForm}>
                Don`t have an account?
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      <style jsx>
        {`
           a{
            border-bottom:1px solid transparent;
          }
          a:hover{
            border-bottom:1px solid white;
          }
          .full-container {
            background-image: url("../../imgs/bg-billboards.jpg");
            height: 100vh;
            z-index: 1;
            position: relative;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }  
          .row {
            width: min-content;
            margin: 0px !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
          }
          a{
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};

export default Login;
