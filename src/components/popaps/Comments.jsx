import { useCallback, useContext, useState } from "react";
import {
  faAlignLeft,
  faAlignRight,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default_post } from "../../constants/Defualts";
import Publishee from "../card-system/Publishee";
import Scroller from "../Scroller";
import clsx from "clsx";
import usePost from "../../Hooks/usePost";
import { db } from "../../Constants/Firebase";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import useUpdate from "../../Hooks/useUpdate";
import Cookies from "js-cookie";

const Comments = ({ post_id, close }) => {
  const [topic, setTopic] = useState("");
  const [refresh, setRefresh] = useState(false);

  function handleDataFromChild(data) {
    setRefresh(data);
  }

  const profile = JSON.parse(Cookies.get('profile'));

  const {
    postData,
    loading: postLoading,
    error: postError,
  } = usePost(collection(db, "posts", post_id, "comments"));

  const {
    updateData,
    loading: postUpdate,
    error: errorUpdate,
  } = useUpdate("posts");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (topic) {
        await postData({
          user_id: profile.id,
          topic,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp(),
        });
        //const column = collection(db, "posts", post_id);
        await getDoc(doc(db, "posts", post_id)).then((res) => {
          updateData({
            id: post_id,
            data: {
              comments: res.data().comments + 1,
            },
          });
        });
        setTopic("");
        setRefresh(true);
      }
    },
    [topic]
  );

  return (
    <div
      className="w-100 h-100 p-relative d-block radius shadow-bolder bg-light-1 index-9 color-dark d-grid of-hidden"
      style={{
        maxHeight: "100%",
        width: "clamp(300px, 500px, 100%)",
        gridTemplateRows: "min-content 1fr min-content",
      }}
    >
      <div className="w-100 t-align-center bg-light-0 p-10 d-flex a-items-center j-content-between shadow-bold index-10">
        <div className="d-flex a-items-center j-content-start g-10">
          <div className="icon">
            <FontAwesomeIcon icon={faAlignRight} />
          </div>
          <h4>التعليقات</h4>
        </div>
        <button className="w-22-px font-16 close-btn" onClick={close}>
          <div className="icon">
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </button>
      </div>
      <div className="w-100 p-10 of-y-auto">
        <div className="w-100 h-fit p-relative">
          <Scroller
            type="comments"
            column={collection(db, "posts", post_id, "comments")}
            refresh={refresh}
            sendDataToParent={handleDataFromChild}
          />
        </div>
      </div>
      <form
        className="w-100 p-10 shadow-bold-r bg-light-0 index-10 d-flex a-items-center g-5"
        onSubmit={handleSubmit}
      >
          <Publishee data={{ user: { ...profile } }} stopNavigation />
        <input
          type="text"
          className="w-100 h-100 p-5 bg-light-2 radius"
          placeholder="اكتب تعليق ..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button
          className={clsx(
            "min-w-40-px h-40-px f-center bg-main color-light-1 font-18 index-10 radius c-pointer"
          )}
        >
          {postLoading ? (
            <div className="loader"></div>
          ) : (
            <div className="icon">
              <FontAwesomeIcon icon={faPlus} />
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default Comments;
