import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const Info = ({ data, loading = false, type = false }) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex f-dir-col g-5 mt-2">
      <h4
        className={clsx("line-height-1 no-space color-dark", { loading })}
        onClick={() => !loading && navigate("/users/" + data.user.id)}
      >
        {loading
          ? "Omar Thabet"
          : data.user.first_name + " " + data.user.last_name}
      </h4>
      <small className={clsx("w-fit font-12 color-light-6 line-height-1", { loading })}>
        {loading
          ? type
            ? "Influencer"
            : "21/6/2007"
          : data.type === "advert"
          ? data.type
          : type
          ? data.user.type.charAt(0).toUpperCase() + data.user.type.slice(1)
          : new Date(data.created_at).toLocaleDateString("en-GB")}
      </small>
    </div>
  );
};

export default Info;
