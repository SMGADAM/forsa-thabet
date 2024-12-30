import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Popup = ({ children, close }) => {
  const [downTarget, setDownTarget] = useState(null);
  const [upTarget, setUpTarget] = useState(null);

  useEffect(() => {
    if (downTarget && upTarget) {
      if (
        downTarget.target === upTarget.target &&
        upTarget.target === document.querySelector(".popup") &&
        downTarget.clientX === upTarget.clientX &&
        downTarget.clientY === upTarget.clientY
      ) {
        close();
      }
    }
  }, [downTarget, upTarget]);

  return createPortal(
    <div
      className="w-100 h-100-vh c-center f-center index-10 px-20 py-40 popup"
      onMouseDown={setDownTarget}
      onMouseUp={setUpTarget}
    >
      {children}
    </div>,
    document.body
  );
};

export default Popup;
