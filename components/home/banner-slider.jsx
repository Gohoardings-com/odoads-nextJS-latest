import React from "react";
import { useRouter } from "next/router";

const page = [
  {
    title: "Our pricing",
    url: "../../imgs/block-price.jpg",
    link: "pricing",
    indx: 2,
    time: 1.6,
    top: -3.2,
    left: 0.4,
    topT: 14,
    leftT: -1.7,
    height: "22vh",
    width: "18.5vw",
  },
  {
    title: "About us",
    url: "../../imgs/block-about.jpg",
    link: "about",
    indx: 2,
    time: 1.5,
    top: -11.5,
    left: 19.9,
    topT: 9.9,
    leftT: 18.6,
    height: "28vh",
    width: "18.8vw",
  },
  {
    title: "Let`s talk",
    url: "../../imgs/block-contact.jpg",
    link: "contact",
    indx: 1.7,
    time: 2.2,
    top: 23.5,
    left: -2.4,
    topT: 40,
    leftT: -3.8,
    height: "22vh",
    width: "19vw",
  },
  {
    title: "On features",
    url: "../../imgs/block-features.jpg",
    link: "features",
    indx: 1.6,
    time: 3.2,
    top: 20.6,
    left: 17.1,
    topT: 40,
    leftT: 14.8,
    height: "29vh",
    width: "21vw",
  },
];

const Pages = () => {
  const route = useRouter();

  const rotateImage = (index) => {
    const rotationAngle = index.time % 2 === 0 ? -5 : 5;
    const animationDuration = 5 + index.time * 1;

    return {
      animation: `rotateAnimation ${animationDuration}s infinite`,
      transformOrigin: "0% 100% ",
      transform: `rotate(${rotationAngle}deg)`,
      left: `${index.left + 2.8}vw`, // Use left instead of marginLeft
      top: `${index.top + 6.9}vh`, // Use top instead of marginTop
      zIndex: index.indx, // Set the z-index
      position: "absolute", // Add position: absolute
      height: index.height,
      width: index.width,
    };
  };
  
  const tooltip = (index) => {
    return {
      left: `${index.leftT}vw`, // Use left instead of marginLeft
      top: `${index.topT}vh`, // Use top instead of marginTop
      zIndex: 100, // Set the z-index
      position: "absolute", // Add position: absolute
    };
  };

  return (
    <div className="dvdv animate__animated animate__fadeInUpBig">
      <div className="d-flex">
        {page.slice(0, 2).map((e, i) => (
          <div key={i} className="image-container">
            <img
              src={e.url}
              alt={e.title}
              key={i}
              className="slid-img"
              onClick={() => route.push(`/${e.link}`)}
              style={rotateImage(e)}
            />
            <span style={tooltip(e)} className="tool">
              {e.title}
              <div className="arrow"></div>
            </span>
          </div>
        ))}
      </div>
      <div className="d-flex">
        {page.slice(2).map((e, i) => (
          <div key={i} className="image-container">
            <img
              src={e.url}
              alt={e.title}
              key={i}
              className="slid-img"
              onClick={() => route.push(`/${e.link}`)}
              style={rotateImage(e)}
            />
            <span style={tooltip(e)} className="tool">
              {e.title}
              <div className="arrow"></div>
            </span>
          </div>
        ))}
      </div>
      <style jsx>{`
        .tool {
          white-space: nowrap;
          font-family: "Open Sans", sans-serif;
          background-color: black;
          color: #fff;
          font-size: 0.7rem;
          font-weight: 300;
          text-align: center;
          border-radius: 2px;
          padding: 3px 5px;
          position: absolute;
          display: none;
        }
        .arrow {
          width: 6px;
          height: 7.6px;
          background-color: black;
          transform: rotate(45deg);
          position: absolute;
          top: 50%;
          z-index: 99;
          margin-top: -3px;
          right: -2.5px;
        }
        .image-container {
          position: relative;
        }
        .image-container:hover .tool {
          display: block;
        }
        .dvdv {
          position: absolute;
          left: 3.5%;
        }
        .slid-img {
          float: right;
          opacity: 0.5;
          border-radius: 4.2px;
          cursor: pointer;
          margin: 4px;
          z-index: 10;
          transition: opacity 0.4s ease; /* Add transition for smooth effect */
        }

        .slid-img:hover {
          opacity: 1; /* Remove opacity on hover */
        }

        .slid-img:not(:hover) {
          transition: opacity 3s ease; /* Add slow fade-in effect on hover out */
        }

        @keyframes rotateAnimation {
          0%,
          100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(1.5deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Pages;
