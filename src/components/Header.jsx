import Lowerbar from "./Lowerbar";
import Upperbar from "./Upperbar";

const Header = () => {
  return (
    <header className="w-100 p-sticky top-0 left-0 bg-light-0 shadow-bold index-5">
      <Upperbar />
      <Lowerbar />
    </header>
  );
};

export default Header;
