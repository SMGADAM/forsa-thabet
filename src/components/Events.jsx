import { faFireAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

const Events = ({ className, style }) => {
  return (
    <nav className={clsx("h-fit col-3 lg:d-none", className)} style={style}>
      <div className="link-1 d-flex a-items-center j-content-start g-10 color-light-7 font-bold p-10 box">
        <div className="f-center font-16">
          <FontAwesomeIcon icon={faFireAlt} />
        </div>
        <p>Events</p>
      </div>
    </nav>
  );
};

export default Events;
