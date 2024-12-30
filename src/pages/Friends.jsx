import Cookies from "js-cookie";
import Scroller from "../components/Scroller";
import { db } from "../Constants/Firebase";
import { collection, documentId, where } from "firebase/firestore";

const Friends = () => {
  const profile = JSON.parse(Cookies.get('profile'));

  return (
      <Scroller
        type="users"
        column={collection(db, "users")}
        conditions={where(documentId(), "!=", profile.id)}
      />
  );
};

export default Friends;
