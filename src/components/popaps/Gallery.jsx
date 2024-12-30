import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

const Gallery = ({ data, close }) => {
  const [popup, setPopup] = useState(data);

  const handleNext = () => {
    setPopup((prev) =>
      prev.data.idx >= prev.data.imgs.length - 1
        ? { ...prev, data: { imgs: prev.data.imgs, idx: 0 } }
        : {
            ...prev,
            data: { imgs: prev.data.imgs, idx: prev.data.idx + 1 },
          }
    );
  };
  const handlePrevious = () => {
    setPopup((prev) =>
      prev.data.idx <= 0
        ? {
            ...prev,
            data: {
              imgs: prev.data.imgs,
              idx: prev.data.imgs.length - 1,
            },
          }
        : {
            ...prev,
            data: { imgs: prev.data.imgs, idx: prev.data.idx - 1 },
          }
    );
  };

  const coverRef = useRef(null);
  //const btnRef = useRef(null);
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    const handleMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
      if (popup.active === true && popup.data.imgs.length > 1) {
        const rect = coverRef.current.getBoundingClientRect();
        //btnRef.current.style.left = e.clientX - rect.x - 25 + "px";
        //btnRef.current.style.top = e.clientY - rect.y - 25 + "px";
      }
    };
    document.addEventListener("mousemove", handleMove);
    return () => {
      document.removeEventListener("mousemove", handleMove);
    };
  });

  return (
    <div
      className="w-100 h-100 p-relative radius shadow-bolder ol-3-light-0 bg-dark f-center index-9"
      ref={coverRef}
      onClick={mouse.x / window.innerWidth < 0.5 ? handlePrevious : handleNext}
    >
      <div
        className="p-absolute top-10 right-10 bg-light-0 circle f-center c-pointer close-btn"
        style={{ width: "30px", height: "30px" }}
        onClick={(e) => close(e)}
      >
        <div className="icon">
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </div>
      <img
        src={popup.data.imgs[popup.data.idx]}
        alt="Popup"
        className="w-100 h-100 fit-cover select-none"
        //style={{ maxHeight: "100%", maxWidth: "100%" }}
      />
      {/* {popup.data.imgs.length > 1 ? (
        <button
          className="p-absolute circle font-40 f-center color-light-0 index-10 d-none"
          style={{
            width: "40px",
            height: "40px",
            top: "-100px",
            left: "-100px",
          }}
          ref={btnRef}
        >
          {mouse.x / window.innerWidth < 0.5 ? (
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          ) : (
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
          )}
        </button>
      ) : null} */}
    </div>
  );
};

export default Gallery;
