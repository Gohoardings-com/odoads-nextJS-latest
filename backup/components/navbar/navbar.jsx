import React, { useState, useEffect ,useContext} from "react";
import { useRouter } from "next/router";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { showOffcanvas } from '../../../redux/userActions'; 
import { AccountContext } from "../..";

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
  const router = useRouter();
  const [scroll] = useWindowScroll();
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const handleMenuClick = () => {
    dispatch(showOffcanvas());
  };

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
    setLogged(userIsAuthenticated);
  }, []);
  return (
    <>
      <nav className="navbar ps-0 dekstop-nav ">
        <div className="nav-container w-100">
          <section className="nav-container">
            <p className="nav-logo m-0 me-md-2 ">
              <img
                src={
                  isVisible
                    ? "../../imgs/black_logo-light.png"
                    : "../../imgs/logo-light.png"
                }
                onClick={() => router.push("/")}
                style={{ cursor: "pointer" }}
              />
            </p>

            <section
              className={
                isVisible ? "navbar-mobile-scroll ms-2" : "navbar-mobile ms-2"
              }
            >
              <ul className="nav nav-navbar ">
                <li className="nav-item ">
                  <p
                    className={
                      isVisible
                        ? "mb-0 nav-link-scroll nav-link "
                        : "nav-link nav-link-notscroll mb-0"
                    }
                  ></p>
                </li>
                <li className="nav-item ">
                  <p
                    className={
                      isVisible
                        ? "mb-0 nav-link-scroll nav-link "
                        : "nav-link nav-link-notscroll mb-0"
                    }
                    onClick={() => router.push("/")}
                  >
                    Home
                  </p>
                </li>
                <li className="nav-item">
                  <p
                    className={
                      isVisible
                        ? "mb-0 nav-link-scroll nav-link "
                        : "nav-link nav-link-notscroll mb-0"
                    }
                    onClick={() => router.push("/about")}
                  >
                    About
                  </p>
                </li>
                <li className="nav-item">
                  <p
                    className={
                      isVisible
                        ? "mb-0 nav-link-scroll nav-link "
                        : "nav-link nav-link-notscroll mb-0"
                    }
                    onClick={() => router.push("/features")}
                  >
                    Features
                  </p>
                </li>
                <li className="nav-item">
                  <p
                    className={
                      isVisible
                        ? "mb-0 nav-link-scroll nav-link "
                        : "nav-link nav-link-notscroll mb-0"
                    }
                    onClick={() => router.push("/pricing")}
                  >
                    Pricing
                  </p>
                </li>
                <li className="nav-item">
                  <p
                    className={
                      isVisible
                        ? "mb-0 nav-link-scroll nav-link "
                        : "nav-link nav-link-notscroll mb-0"
                    }
                    onClick={() => router.push("/contact")}
                  >
                    Contact
                  </p>
                </li>
              </ul>
            </section>
          </section>

          <form className="nav-search">
            {loged ? (
              <button
                className="search-btn  btn-success me-0 lg-btn"
                type="button"
                onClick={() => router.push("/admin")}
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
            <span
              className="p-2 ps-0 me-3"
             onClick={handleMenuClick}
            >
              <AiOutlineMenu
                style={
                  isVisible
                    ? { color: "#757575", fontSize: "1.35rem" }
                    : { color: "#fff", fontSize: "1.35rem", opacity: ".7" }
                }
              />
            </span>
            <p className="nav-logo m-0 ">
              <img
                src={
                  isVisible
                    ? "../../imgs/black_logo-light.png"
                    : "../../imgs/logo-light.png"
                }
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
                onClick={() => router.push("/admin")}
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
          .navbar-mobile {
            border-left: 1px solid transparent;
          }
          .navbar-mobile-scroll {
            border-left: 1px solid #eeeeee;
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
            font-size: 0.8em;
            word-spacing: 2px;
            padding-left: 1.125rem;
            padding-right: 1.125rem;
            padding-top: 0.3em;
            font-family: sans-serif;
            padding-bottom: 0;
          }
          .nav-link-notscroll {
            color: rgba(255, 255, 255, 0.65);
          }
          .nav-link-notscroll:hover {
            color: #ffffff;
          }
          .nav-link-scroll {
            color: #979797;
          }
          .nav-link-scroll:hover {
            color: black;
          }

          @media screen and (max-width: 500px) {
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
            background-color: #3cd458;
            border-color: #3cd458;
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
