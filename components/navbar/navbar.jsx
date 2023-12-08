import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AiOutlineMenu } from "react-icons/ai";
import { AccountContext } from "../../apis/contextApi";
import Cookies from 'js-cookie';
function useWindowScroll() {
  const [scrollPosition, setScrollPosition] = useState([
    typeof window !== "undefined" && window.pageYOffset,
  ]);
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition([typeof window !== "undefined" && window.pageYOffset]);
    };
    typeof window !== "undefined" &&
      window.addEventListener("scroll", handleScroll);

    return () => {
      typeof window !== "undefined" &&
        window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return scrollPosition;
}

const Navbar = () => {
  const [loged, setLogged] = useState();
  const [paid, setPaid] = useState();
  const router = useRouter();
  const [scroll] = useWindowScroll();
  const [isVisible, setIsVisible] = useState(false);

  const { handleShow } = useContext(AccountContext);

  useEffect(() => {
    const handleCss = () => {
      if (scroll > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    handleCss();
  }, [scroll]);
  useEffect(() => {
    //check user logged in or not
    const userIsAuthenticated =
      typeof window !== "undefined" && localStorage.getItem("user") !== null;
    const userpaid =
      typeof window !== "undefined" && Cookies.get("odoads_goh") !== undefined;
    setPaid(userpaid);
    setLogged(userIsAuthenticated);
  }, []);

  const navigate=()=>{
    if(paid){
      router.push("/admin")
    }else{
      alert("Purchase our plan or select free trial to access dashboard");
      router.push("/pricing")
    }
  }
  return (
    <>
      <nav className="navbar ps-0 dekstop-nav ">
        <div className="nav-container w-100">
          <section className="nav-container">
            <p className="nav-logo m-0 me-md-2 ">
              <img
                src={"../../imgs/black_logo-light.png"}
                onClick={() => router.push("/")}
                style={{ cursor: "pointer" }}
              />
            </p>
          </section>

          <form className="nav-search d-flex">
            <section
              className={
                isVisible ? "navbar-mobile-scroll ms-2" : "navbar-mobile ms-2"
              }
            >
              <ul className="nav nav-navbar ">
                <li className="nav-item ">
                  <p className="nav-link mb-0" onClick={() => router.push("/")}>
                    Home
                  </p>
                </li>
                <li className="nav-item">
                  <p
                    className="nav-link mb-0"
                    onClick={() => router.push("/about")}
                  >
                    About
                  </p>
                </li>
                <li className="nav-item">
                  <p
                    className="nav-link mb-0"
                    onClick={() => router.push("/features")}
                  >
                    Features
                  </p>
                </li>
                <li className="nav-item">
                  <p
                    className="nav-link mb-0"
                    onClick={() => router.push("/pricing")}
                  >
                    Pricing
                  </p>
                </li>
                <li className="nav-item">
                  <p
                    className="nav-link mb-0"
                    onClick={() => router.push("/contact")}
                  >
                    Contact
                  </p>
                </li>
                <li className="nav-item">
                  <p className="nav-link mb-0"></p>
                </li>
              </ul>
            </section>

            {loged ? (
              <button
                className="search-btn  btn-success me-0 lg-btn"
                type="button"
                onClick={() => navigate()}
              >
                My Dashboard
              </button>
            ) : (
              <>
                <button
                  className="search-btn  btn-success  me-0 lg-btn"
                  type="button"
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
              </>
            )}
          </form>
        </div>
      </nav>

      {/* mobile nav */}
      <nav className="navbar ps-0 mbil-nav">
        <div className="nav-container w-100">
          <section className="nav-container  ">
            <span class="p-2 ps-0 me-3 ">
              <AiOutlineMenu
                style={
                  isVisible
                    ? { color: "#757575", fontSize: "1.35rem" }
                    : { color: "black", fontSize: "1.35rem", opacity: ".7" }
                }
                onClick={() => handleShow()}
              />
            </span>
            <p className="nav-logo m-0 ">
              <img
                src={"../../imgs/black_logo-light.png"}
                onClick={() => router.push("/")}
                style={{ cursor: "pointer" }}
              />
            </p>
          </section>

          <form className="nav-search">
            {loged ? (
              <button
                className="search-btn  btn-success me-0"
                type="button"
                onClick={() => navigate()}
              >
                My Dashboard
              </button>
            ) : (
              <>
                <button
                  className="search-btn  btn-success ps-3 pe-3 me-0"
                  type="button"
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
              </>
            )}
          </form>
        </div>
      </nav>
      <style jsx>
        {`
          .lg-btn {
            padding: 5px 11px;
            font-size: 10px;
          }

          .mbil-nav {
            display: none;
          }
          .navbar {
            background-color: transparent;
            padding: 16px 0px;
          }

          .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            vertical-align: middle;
          }
          .icon {
            font-size: 15px;
          }
          .nav-logo {
            font-size: 1.2rem;
            text-decoration: none;
          }

          .nav-item {
            vertical-align: middle;
          }

          .nav-link {
            cursor: pointer;
            transition: all 0.3s ease-out;
            padding-bottom: 0;
            cursor: pointer;
            color: rgba(255, 255, 255, 0.65);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 0.71em;
            color: rgb(0 0 0 / 65%);
            word-spacing: 2px;
            padding-left: 1.125rem;
            padding-right: 1.125rem;

            font-family: sans-serif;
            padding-bottom: 0;
          }

          .nav-link:hover {
            color: black;
          }

          @media screen and (max-width: 720px) {
            // .mb-nav {
            //   width: 32vw;
            // }
            .dekstop-nav {
              display: none;
            }
            .mbil-nav {
              display: block;
              padding: 14px 0px;
            }
          }

          .search-input {
            padding: 5px;
            border: 1px solid #ccc;
          }

          .search-btn {
            letter-spacing: 1.7px;
            text-transform: uppercase;
            border-radius: 10rem;
            font-weight: 600;
            width: auto;
            -webkit-transition: 0.15s linear;
            transition: 0.15s linear;
            text-transform: uppercase;
            outline: none;
            border: 1px solid transparent;
            cursor: pointer;
            text-align: center;
            font-family: "Open Sans", sans-serif;
            vertical-align: middle;
          }

          .btn-success {
            color: #fff;
            background-color: #5edf2d;
            border-color: #5edf2d;
          }

          .search-btn:hover {
            color: #fff;
            background-color: #2dce4b;
            border-color: #2dce4b;
            box-shadow: 0 1px 10px rgba(60, 212, 88, 0.4);
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
