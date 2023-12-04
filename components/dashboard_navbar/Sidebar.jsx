import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  AiOutlineUser,
  AiOutlineAlignRight,
  AiFillProfile,
} from "react-icons/ai";
import { FaBraille } from "react-icons/fa";
import { RiUserShared2Line, RiLogoutCircleLine } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { SlCalender } from "react-icons/sl";
import { MdPermMedia, MdOutlineCampaign } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { setUsers, setUserPermission } from "../../redux/userActions";
import styles from "../../styles/sidebar.module.scss";
import { useRouter } from "next/router";
import {
  BsFillPeopleFill,
  BsListTask,
  BsTelephoneInbound,
  BsBell,
} from "react-icons/bs";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { ImHome3 } from "react-icons/im";
import Cookies from "js-cookie";
import { allPermissionapi, getUserApi, logoutApi } from "../../apis/apis";

const routes = [
  {
    path: "/admin",
    name: "Dashboard",
    icon: <ImHome3 />,
    select: false,
  },
  {
    path: "/admin/leads",
    name: "Leads/Media request",
    icon: <BsTelephoneInbound />,
    select: false,
  },
  {
    path: "/admin/media_management",
    name: "Media Inventory",
    icon: <MdPermMedia />,
    select: false,
  },
  {
    path: "/admin/media_planning",
    name: "Planing, Blocking, Booking",
    icon: <FaBraille />,
    select: false,
  },

  {
    path: "/admin/clients",
    name: "Customer",
    icon: <MdOutlinePeopleAlt />,
    select: false,
  },
  {
    path: "/admin/invoice",
    name: "Invoice",
    icon: <TbFileInvoice />,
    select: false,
  },
  {
    path: "/admin/campaigns",
    name: "Campaign",
    icon: <MdOutlineCampaign />,
    select: false,
  },
  {
    path: "/admin/treadedby",
    name: "Traded By",
    icon: <BsFillPeopleFill />,
    select: false,
  },

  {
    path: "/admin/role",
    name: "ROLES",
    icon: <AiOutlineUser />,
    select: false,
  },

  {
    path: "/admin/staff",
    name: "STAFF",
    icon: <RiUserShared2Line />,
    select: false,
  },

  {
    path: "/admin/task",
    name: "Tasks",
    icon: <BsListTask />,
    select: false,
  },
];
const menuItems = [
  {
    id: 1,
    label: "Campaign",
    name: "Campaign",
    path: "/admin/campaigns",
  },
  {
    id: 2,
    label: "Customer",
    name: "Customer",
    path: "/admin/clients",
  },
  {
    id: 3,
    label: "Leads / Request",
    name: "Leads/Media request",
    path: "/admin/leads",
  },
  {
    id: 4,
    label: "Media",
    name: "Media Inventory",
    path: "/admin/media_management",
  },
];
const SideBar = () => {
  const dispatch = useDispatch();
  const route = useRouter();
  const [user, setUser] = useState();
  const [roleName, setUserRole] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [isHover, setIsHover] = useState(false);
  const [notificationHover, setNotificationHover] = useState(false);
  const [notification, setNotification] = useState([
    { notification: "notification about trade" },
    { notification: "notification about campaign" },
    { notification: "notification about clients" },
  ]);

  const handleHover = () => {
    setIsHover(true);
  };
  const handleHoverNotifi = () => {
    setNotificationHover(true);
  };

  const handleLeave = () => {
    setIsHover(false);
  };

  const handleLeaveNotifi = () => {
    setNotificationHover(false);
  };

  //get user api
  const userIsAuthenticated =
    typeof window !== "undefined" && Cookies.get("odoads_goh") !== undefined;

  const userAdmin = async () => {
    if (userIsAuthenticated) {
      const data = await getUserApi();
      const main = data[0];
      dispatch(setUsers(main));
      setUser(data[0].id);
      setUserRole(data[0].name);
    }
  };

  //get user permission
  const change = async () => {
    const id = user;
    if (id) {
      const data = await allPermissionapi(id, roleName);
      dispatch(setUserPermission(data));
    }
  };

  const Selectroute = (e) => {
    routes.forEach((el) => {
      el.select = el.name === e.name ? true : false;
    });
  };

  useEffect(() => {
    routes.forEach((el) => {
      el.select = el.path === route.pathname ? true : false;
    });
    userAdmin();
  }, []);

  useEffect(() => {
    change();
  }, [user]);

  //user logout api
  const logoutUser = async () => {
    const post = await logoutApi(user);
    if (post.success == true) {
      //clr local storage
      document.cookie =
        "odoads_goh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("user");
      localStorage.removeItem("expirationTime");

      //navigate to home pg
      route.push("/");
    }
  };

  return (
    <>
      <div className={styles.nav_container}>
        <nav className={styles.admin_header}>
          <div className={styles.nav_items}>
            <ul>
              <li
                className={styles.nav_item}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                <FiPlus />
                <p>Create</p>
                {isHover && (
                  <ul className={styles.create_ul} onMouseEnter={handleHover}>
                    {menuItems.map((item) => (
                      <li key={item.id} onClick={() => Selectroute(item)}>
                        <Link className={styles.create_link} href={item.path}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className={styles.nav_item}>
                <AiFillProfile className="" />
                <p className="mb-0 ">
                  <Link
                    className={styles.tooltip}
                    style={{ color: "black" }}
                    href="/admin/task"
                  >
                    Tasks<span className={styles.tooltiptext}>Go to task</span>
                  </Link>
                </p>
              </li>
              <li className={styles.nav_item}>
                <SlCalender />
                <p className={styles.tooltip}>
                  Schedule<span className={styles.tooltiptext}>Schedule</span>
                </p>
              </li>
              <li
                className={styles.nav_item}
                onMouseEnter={handleHoverNotifi}
                onMouseLeave={handleLeaveNotifi}
              >
                <BsBell />
                <p className="mb-0">Notification</p>
                {notificationHover && (
                  <div
                    className={styles.notification}
                    onMouseEnter={handleHoverNotifi}
                  >
                    <ul className={`${styles.notification_ul} ps-1`}>
                      {notification.map((items, index) => (
                        <li className={styles.notification_li} key={index}>
                          {items.notification}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
              <li className={styles.nav_item} onClick={() => logoutUser()}>
                <RiLogoutCircleLine />
                <p
                  className={`${styles.tooltip} mb-0`}
                  style={{ color: "black" }}
                >
                  Log out<span className={styles.tooltiptext}>Log out</span>
                </p>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <aside className={styles.main_container}>
        <motion.div
          animate={{
            width: isOpen ? "220px" : "45px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 20,
            },
          }}
          className={styles.sidebar}
        >
          <div>
            <div className={styles.nav_logo_res}>
              {isOpen ? (
                <>
                  {" "}
                  {/* <img src="/assests/logo.png" alt="" /> */}
                  <i
                    className="fa-solid fa-xmark"
                    style={{ fontSize: "28px" }}
                    onClick={toggle}
                  ></i>
                </>
              ) : (
                <>
                  <AiOutlineAlignRight
                    onClick={toggle}
                    style={{ fontSize: "28px", margin: "5px auto" }}
                  />
                </>
              )}
            </div>
          </div>
          <div className={styles.nav_logo}>
            <img
              src="../../imgs/logo.png"
              alt="logo"
              className="ms-2 mt-1"
              onClick={() => route.push("/")}
              style={{ cursor: "pointer" }}
            />
          </div>
          <section className={styles.routes}>
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <div key={index}>
                    {/* <SidebarMenu
                      setIsOpen={setIsOpen}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                    /> */}
                  </div>
                );
              }

              return (
                <Link
                  href={route.path}
                  key={index}
                  onClick={() => Selectroute(route)}
                  className={styles.link}
                  aria-expanded={route.select}
                >
                  <div className={styles.icon}>{route.icon}</div>
                  {/* <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      > */}
                  {route.name}
                  {/* </motion.div>
                    )}
                  </AnimatePresence> */}
                </Link>
              );
            })}
          </section>
        </motion.div>
      </aside>
    </>
  );
};

export default SideBar;
