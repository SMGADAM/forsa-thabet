import { useState } from "react";

const usePopup = () => {
  const [data, setData] = useState({ active: false, data: null });
  const handle = (data = {}) => {
    setData({ active: true, data: data });
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    setData({ active: false, data: null });
    document.body.style.overflow = "auto";
  };
  return { handle, close, data };
};

export default usePopup;
