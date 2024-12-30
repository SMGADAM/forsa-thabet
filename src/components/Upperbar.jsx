import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  faMessage,
  faRightFromBracket,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Publishee from "./card-system/Publishee";
import Info from "./card-system/Info";
import useAuthentication from "../Hooks/useAuthentication";
import Cookies from "js-cookie";

const Upperbar = () => {
  const [bar, setBar] = useState(false);
  const { Logout } = useAuthentication();
  const profile = JSON.parse(Cookies.get('profile'));

  return (
    <nav className="w-100 d-flex a-items-center j-content-between py-10 container shadow-bold">
      <NavLink
        to="/"
        className="col color-main d-flex a-items-center j-content-start g-5"
      >
        <div className="logo">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h1>فرصة</h1>
      </NavLink>
      <div className="w-100 h-35-px col-6 d-flex radius b-1 of-hidden">
        <input
          className="w-100 h-100 py-5 px-10"
          type="text"
          name="search"
          placeholder="أبحث عن ..."
        />
        <button className="w-35-px bg-light-2 br-1 color-light-5 p-7">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="col d-flex a-items-center j-content-end g-10">
        {/* <NavLink
          to="/messenger"
          className="opacity-hover w-35-px h-35-px f-center radius font-16 bg-light-2 color-light-7"
        >
          <div className="f-center">
            <FontAwesomeIcon icon={faMessage} />
          </div>
        </NavLink> */}
        {profile ? (
          <>
            <div
              className="p-relative w-35-px h-35-px f-center radius font-16 bg-light-2 color-light-7"
              onClick={() => setBar((prev) => !prev)}
            >
              {profile.image ? (
                <img
                  className="w-100 h-100 fit-cover radius opacity-hover"
                  src={profile.image}
                  alt="Profile"
                />
              ) : (
                <div className="opacity-hover w-35-px h-35-px f-center radius font-16 bg-light-2 color-light-7">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              )}
              <div
                className={clsx(
                  "p-absolute bg-light-2 radius p-5 f-dir-col g-5 index-10",
                  bar ? "d-flex" : "d-none"
                )}
                style={{ width: "250px", bottom: "-140px", left: "0" }}
              >
                <NavLink
                  to="/profile"
                  className="d-flex g-10 bg-hover p-10 radius c-pointer"
                >
                  <Publishee data={{ user: { ...profile } }} />
                  <Info data={{ user: { ...profile } }} type />
                </NavLink>
                <div className="hr-100 m-0"></div>
                <div
                  className="d-flex g-10 color-dark bg-hover p-10 radius c-pointer"
                  onClick={Logout}
                >
                  <div className="f-center">
                    <FontAwesomeIcon icon={faRightFromBracket} />
                  </div>
                  <h4>تسجيل الخروج</h4>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="opacity-hover w-35-px h-35-px f-center radius font-16 bg-light-2 color-light-7">
            <FontAwesomeIcon icon={faUser} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Upperbar;
