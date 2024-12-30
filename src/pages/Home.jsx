import Scroller from "../components/Scroller";

//Database
import { db } from "../Constants/Firebase";
import { collection } from "firebase/firestore";

const Home = () => {
  return <Scroller type="posts" column={collection(db, "posts")} />;
};

export default Home;
