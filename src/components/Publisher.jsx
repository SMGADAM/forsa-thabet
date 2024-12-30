import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Popup from "./Popup";
import Create from "./popaps/Create";
import usePopup from "../Hooks/usePopup";

const Publisher = () => {
  const inputRef = useRef(null);

  const { handle, close, data } = usePopup();

  return (
    <div className="w-100 box py-10 d-flex j-content-between ">
      <input
        className="w-100 h-40-px"
        type="text"
        name="post"
        placeholder="سجل أفكارك ..."
        ref={inputRef}
      />
      <button
        className="w-30-px h-40-px circle mr-5 color-light-7 font-16 f-center"
        onClick={handle}
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
      {data.active ? (
        <Popup close={close}>
          <Create
            data={inputRef.current && inputRef.current.value}
            close={close}
          />
        </Popup>
      ) : null}
    </div>
  );
};

export default Publisher;
