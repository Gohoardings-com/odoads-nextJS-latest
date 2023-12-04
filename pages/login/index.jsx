import React, { useState } from "react";
import LoginForm from "./login-form";
import { useRouter } from "next/router";
import RegistrationForm from "./register-form";

const Login = () => {
  const router = useRouter();
  const [isLgn, setIsLgn] = useState(false);
  const [forget, setForgeted] = useState(false);
  const toggleForm = () => {
    setIsLgn(!isLgn);
  };
  return (
    <>
      <div className="full-container container-fluid ">
        <div className="row">
          <div className="col-md-6 dekstop-view p-md-5 ">
            <img
              className="ms-3"
              src={
                forget && !isLgn ? "../../imgs/l2.jpeg" : "../../imgs/l1.jpeg"
              }
            />
          </div>
          <div className="col-md-6 col-12 p-2 p-md-5">
            <img
              src={"../../imgs/black_logo-light.png"}
              onClick={() => router.push("/")}
              style={{ cursor: "pointer" }}
            />
            {!isLgn ? (
              <>
                <LoginForm setForgeted={setForgeted} />
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
                  <a className="" onClick={toggleForm}>
                    Already have an account?
                  </a>
                </>
              ) : (
                <>
                  {" "}
                  <a className="" onClick={toggleForm}>
                    Don`t have an account?
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .full-container {
            position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
          
            
          }
          .center {
            margin: 0px !important;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          a {
            color: #838181;
            min-height: 20px;

            margin-bottom: 0;

            cursor: pointer;
          }
          @media screen and (max-width: 720px) {
          
            .dekstop-view{
              display:none;
            }
          }
          }
        `}
      </style>
    </>
  );
};

export default Login;
