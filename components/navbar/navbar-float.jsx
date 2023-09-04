import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
function useWindowScroll() {
  const [scrollPosition, setScrollPosition] = useState([ typeof window !== "undefined" && window.pageYOffset]);
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition([ typeof window !== "undefined" && window.pageYOffset]);
    };
    typeof window !== "undefined" && window.addEventListener("scroll", handleScroll);

    return () => {
      typeof window !== "undefined" && window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return scrollPosition;
}

const Floatingnavbar = () => {
  const [scroll] = useWindowScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleCss = () => {
      if (scroll > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    handleCss();
  }, [scroll]);
  return (
    <>
      <div
       style={{
        // display:isVisible ? "block":  "none" ,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0%)" : "translateY(-100%)",
      }}
        className="new-search  pt-0  pb-0">
        <div className="container pb-0 pt-0">
          <Navbar />
        </div>
      </div>
      <style jsx>
        {`
        
         .new-search {
          position: fixed;
          z-index: 15;
          top: 0%;
          left: 0%;
          background-color: rgba(255,255,255,0.99);
          box-shadow: 0 1px 9px rgba(0,0,0,0.05);
          width: 100vw;
          transition: opacity 0.6s, transform 0.6s;
        }
        @media screen and (max-width: 500px) {
          .new-search {
           padding: .2vw 4vw; 
          }
        }
        `}
      </style>
    </>
  );
};

export default Floatingnavbar;
