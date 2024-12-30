import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faHeart,
  faHeartBroken,
  faSave,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import SupportBox from "./SupportBox";
import usePopup from "../../Hooks/usePopup";
import Popup from "../Popup";
import Comments from "../popaps/Comments";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../Constants/Firebase";
import useUpdate from "../../Hooks/useUpdate";
import clsx from "clsx";
import useDelete from "../../Hooks/useDelete";
import { RefreshContext } from "../../Contexts/RefreshContext";
import Cookies from "js-cookie";

const Interaction = ({ data, loading = false }) => {
  const profile = JSON.parse(Cookies.get('profile'));

  const {
    handle: handleComments,
    close: closeComments,
    data: commentsData,
  } = usePopup();

  const {
    updateData,
    loading: updateLoading,
    error: updateError,
  } = useUpdate("posts");

  const {
    deleteData,
    loading: deleteLoading,
    error: deleteError,
  } = useDelete("posts");

  const { refresh, setRefresh } = useContext(RefreshContext);

  const handleDelete = () => {
    deleteData(data.id).then(() => setRefresh(true));
  };

  const [support, setSupport] = useState(false);

  const [localLoading, setLocalLoading] = useState(false);
  const handleCheck = async () => {
    setLocalLoading(true);
    const val = await getDoc(doc(db, "posts", data.id)).then((res) =>
      res.data().supporters_id.includes(profile.id) ? true : false
    );
    setLocalLoading(false);
    return val;
  };

  const handleSupport = useCallback(async () => {
    await getDoc(doc(db, "posts", data.id)).then((res) => {
      const statement =
        res.data().supporters_id.includes(profile.id)
          ? true
          : false;

      if (statement) {
        setSupport(false);
        updateData({
          id: data.id,
          data: {
            supporters_id: res
              .data()
              .supporters_id.filter((e) => e !== profile.id),
            supports: res.data().supporters_id.length - 1,
          },
        });
      } else {
        setSupport(true);
        updateData({
          id: data.id,
          data: {
            supporters_id: [...res.data().supporters_id, profile.id],
            supports: res.data().supporters_id.length + 1,
          },
        });
      }
    });
  }, []);

  const isMount = useRef(false);
  useEffect(() => {
    if (!isMount.current) {
      handleCheck().then((res) => setSupport(res));
      isMount.current = true;
    }
  }, []);

  return (
    <>
      <div className="w-100 d-flex j-content-between g-10 f-wrap">
        <div className="d-flex g-10">
          <div className="bg-light-2 radius f-center of-hidden">
            <SupportBox
              className={clsx(support ? "color-red" : "")}
              icon={<FontAwesomeIcon icon={faHeart} />}
              text={
                loading || localLoading ? "مساهمة" : data.supports || "مساهمة"
              }
              onClick={handleSupport}
            />
            {/* <div className="vl" />
            <SupportBox icon={<FontAwesomeIcon icon={faHeartBroken} />} /> */}
          </div>
          <SupportBox
            icon={<FontAwesomeIcon icon={faCommentAlt} />}
            text={
              loading || localLoading ? "تعليق" : data.comments || "تعليق"
            }
            onClick={handleComments}
          />
          {/* <SupportBox icon={<FontAwesomeIcon icon={faShare} />} /> */}
        </div>
        <div className="d-flex g-10">
          {!loading && !localLoading && data.user_id === profile.id ? (
            <SupportBox
              icon={
                deleteLoading ? (
                  <div className="loader m-auto bt-3-main"></div>
                ) : (
                  <FontAwesomeIcon icon={faTrash} />
                )
              }
              onClick={handleDelete}
            />
          ) : null}
          {/* <SupportBox icon={<FontAwesomeIcon icon={faSave} />} /> */}
        </div>
      </div>
      {commentsData.active ? (
        <Popup close={closeComments}>
          <Comments post_id={data.id} close={closeComments} />
        </Popup>
      ) : null}
    </>
  );
};

export default Interaction;
