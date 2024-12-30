import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faBell,
  faCalendarDays,
  faGear,
  faHome,
  faUserFriends,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { Profiler } from "react";
import { faGoogleScholar } from "@fortawesome/free-brands-svg-icons";

const navlink_Data = [
  {
    href: "/",
    title: "الصفحة الرئيسية",
    icon: <FontAwesomeIcon icon={faHome} />,
    hr: true,
  },
  {
    href: "/scholarships",
    title: "المنح",
    icon: <FontAwesomeIcon icon={faGoogleScholar} />,
  },
  {
    href: "/inquiries",
    title: "الاستفسارات",
    icon: <FontAwesomeIcon icon={faCalendarDays} />,
  },
  {
    href: "/events",
    title: "الأحداث",
    icon: <FontAwesomeIcon icon={faCalendarDays} />,
    hr: true,
  },

  {
    href: "/friends",
    title: "الأصدقاء",
    icon: <FontAwesomeIcon icon={faUserFriends} />,
    hr: true,
  },
  {
    href: "/notifications",
    title: "الإشعارات",
    icon: <FontAwesomeIcon icon={faBell} />,
  },
];

const Navbar = ({ className, style }) => {
  return (
    <nav
      className={clsx(
        "w-25 h-fit col-3 d-flex f-dir-col g-5 lg:d-none",
        className
      )}
      style={style}
    >
      {navlink_Data.map((link, idx) => (
        <Profiler id={"id:" + idx} key={idx}>
          <NavLink
            to={link.href}
            key={idx + "nav"}
            className="bg-hover link-1 d-flex a-items-center j-content-start g-10 color-light-7 font-bold py-10 px-15 box"
          >
            <div className="f-center font-16">{link.icon}</div>
            <p>{link.title}</p>
          </NavLink>
          {link.hr ? <div className="hr mx-auto" key={idx + "hr"} /> : null}
        </Profiler>
      ))}
    </nav>
  );
};

export default Navbar;
