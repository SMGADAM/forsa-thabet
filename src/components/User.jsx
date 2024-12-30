import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Publishee from "./card-system/Publishee";
import Info from "./card-system/Info";
import clsx from "clsx";
import { db } from "../Constants/Firebase";
import { doc, getDoc } from "firebase/firestore";
import useUpdate from "../Hooks/useUpdate";
import Cookies from "js-cookie";

const User = ({ data, loading = false }) => {
  const [follow, setFollow] = useState(false);

  const profile = JSON.parse(Cookies.get('profile'));

  const {
    updateData,
    loading: updateLoading,
    error: updateError,
  } = useUpdate("users");

  const handleCheck = async () => {
    const val = await getDoc(doc(db, "users", data.user.id)).then((res) =>
      res.data().followers_id.includes(profile.id) ? true : false
    );
    return val;
  };

  const handleSupport = useCallback(async () => {
    await getDoc(doc(db, "users", data.user.id)).then((res) => {
      const statement =
        res.data().followers_id.includes(profile.id)
          ? true
          : false;

      if (statement) {
        setFollow(false);
        updateData({
          id: data.user.id,
          data: {
            followers_id: res
              .data()
              .followers_id.filter((e) => e !== profile.id),
            followers: res.data().followers_id.length - 1,
          },
        });
      } else {
        setFollow(true);
        updateData({
          id: data.user.id,
          data: {
            followers_id: [...res.data().followers_id, profile.id],
            followers: res.data().followers_id.length + 1,
          },
        });
      }
    });
  }, []);

  const isMount = useRef(false);
  useEffect(() => {
    if (!isMount.current) {
      handleCheck().then((res) => setFollow(res));
      isMount.current = true;
    }
  }, []);

  return (
    <div className="w-100 d-flex p-15 g-10 f-wrap j-content-between g-20 box">
      <div className="d-flex g-8">
        <Publishee data={data} loading={loading } />
        <Info data={data} loading={loading} type />
      </div>
      <div className="f-center f-wrap g-5">
        <button
          className={clsx(
            "py-5 px-10 radius font-bold",
            follow ? "bg-light-0 color-main" : "bg-main color-light-0",
            loading ? "تحميل..." : ""
          )}
          onClick={handleSupport}
        >
          {!follow ? "متابعة" : "الغاء المتابعة"}
        </button>
        <small
          className={clsx(
            "py-5 px-10 bg-light-0 radius color-main font-bold b-1-main",
            loading  ? "تحميل..." : ""
          )}
        >
          {loading ? 2162007 : data.user.followers}
        </small>
      </div>
    </div>
  );
};

export default User;
