import { Outlet } from "react-router-dom";

const Author = () => {
  return (
    <main className="w-100 container py-10">
      <div className="d-flex">
        <Outlet />
      </div>
    </main>
  );
};

export default Author;
