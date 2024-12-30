import { MouseEvent, useRef, useState } from "react";

const trendings = [
  "#Amirican_univercity_in_egypt",
  "#GUC",
  "#I_love_you_all_time",
  "#EDUGATE",
  "#BUE",
  "#Roma_all_time",
  "#Bang_bang",
  "#Attack_on_titan",
  "#Good_game",
  "#Wasel",
  "#Newyork_all_time",
  "#GTA_san_andreas",
];

const Lowerbar = () => {
  const slideRef = useRef(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDraging = (e) => {
    setMouseDown(true);
    setStartX(e.pageX - slideRef.current.offsetLeft);
    setScrollLeft(slideRef.current.offsetLeft);
  };
  const stopDraging = () => {
    setMouseDown(false);
  };
  const handleDrag = (e) => {
    e.preventDefault();
    if (!mouseDown) return;
    const x = e.pageX - slideRef.current.offsetLeft;
    const scroll = x - startX;
    slideRef.current.scrollLeft = scrollLeft - scroll;
  };

  return (
    <div
      className="w-100 p-relative py-8 px-5 of-x-overlay of-visible"
      ref={slideRef}
      onMouseDown={startDraging}
      onMouseUp={stopDraging}
      onMouseLeave={stopDraging}
      onMouseMove={handleDrag}
    >
      <div className="w-fit d-flex a-items-center j-content-start g-5">
        {trendings.map((trend, idx) => (
          <small
            key={idx}
            className="py-5 px-10 radius bg-main color-light-0 font-bold c-pointer"
          >
            {trend}
          </small>
        ))}
      </div>
    </div>
  );
};

export default Lowerbar;
