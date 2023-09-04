import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import styles from "../../styles/sidebar.module.scss";
import Link from "next/link";
const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};

const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

const SidebarMenu = ({ route, showAnimation, isOpen, setIsOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);

  const SelecSubtroute = (e) => {
    route.subRoutes.forEach((el) => {
      el.select = el.name === e.name ? true : false;
    });
  };

  return (
    <>
      <div className={styles.menu} onClick={toggleMenu}>
        <div className={styles.menu_item}>
          <div className={styles.icon}>{route.icon}</div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className={styles.link_text}
              >
                {route.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isOpen && (
          <motion.div
            animate={
              isMenuOpen
                ? {
                    rotate: 0,
                  }
                : {
                    rotate: -90,
                  }
            }
          >
            {isMenuOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </motion.div>
        )}
      </div>{" "}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className={styles.menu_container}
          >
            {route.subRoutes.map((subRoute, i) => (
              <motion.div variants={menuItemAnimation} key={i} custom={i}>
                <Link
                  href={subRoute.path}
                  className={styles.link}
                  onClick={() => SelecSubtroute(subRoute)}
                  aria-expanded={subRoute.select}
                >
                  <div className={styles.icon}>{subRoute.icon}</div>
                  <motion.div className={styles.link_text}>
                    {subRoute.name}
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}{" "}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu;
