import { useNavigate } from "react-router-dom";
import { faCheck, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

const Publishee = ({ data, loading = false, stopNavigation = false }) => {
  const navigate = useNavigate();

  return (
    <div
      className={clsx("min-w-40-px min-h-40-px w-40-px h-40-px p-relative", {
        "c-pointer": !loading,
      })}
      onClick={() =>
        !loading && !stopNavigation && navigate("/users/" + data.user.id)
      }
    >
      {data.user.image ? (
        <img
          className="w-100 h-100 fit-cover radius"
          src={data.user.image}
          alt="Profile"
        />
      ) : (
        <div className="w-100 h-100 bg-main radius f-center color-light-0 font-20">
          <FontAwesomeIcon icon={faUser} />
        </div>
      )}
      {data.user.documented && (
        <div className="w-14-px h-14-px p-absolute right-m-4 bottom-m-4 p-3 radius bg-main color-light-0 font-10 ol-3-light-0 f-center">
          <FontAwesomeIcon icon={faCheck} />
        </div>
      )}
    </div>
  );
};

export default Publishee;
