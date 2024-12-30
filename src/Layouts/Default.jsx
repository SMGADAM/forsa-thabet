import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Events from "../components/Events";
import { Outlet } from "react-router-dom";
import clsx from "clsx";

const Default = ({ short = false }) => {
  return (
    <>
      <Header />
      <main className="w-100 container py-10 sm:p-0">
        <div className="d-flex">
          {!short && <Navbar className="p-sticky" style={{ top: "124px" }} />}
          <div
            className={clsx(
              "p-relative h-fit lg:col-12 lg:p-0",
              short ? "col-12 px-0" : "col-9 pr-20"
            )}
          >
            <Outlet />
          </div>
          {/* {!short && <Events className="p-sticky" style={{ top: "107px" }} />} */}
        </div>
      </main>
    </>
  );
};

export default Default;
