import Interaction from "./card-system/Interaction";
import Images from "./card-system/Images";
import Topic from "./card-system/Topic";
import Categories from "./card-system/Categories";
import Publishee from "./card-system/Publishee";
import Info from "./card-system/Info";
import useFetchDocParam from "../Hooks/useFetchDocParam";
import { useEffect, useRef } from "react";
import { db } from "../Constants/Firebase";
import { collection, documentId, query, where } from "firebase/firestore";

const Post = ({ data, loading = false }) => {
  const {
    getData,
    loading: userLoading,
    error: userError,
    data: userData,
  } = useFetchDocParam();

  const isMount = useRef(false);
  useEffect(() => {
    if (!isMount.current && !loading) {
      const column = collection(db, "users");
      const q = query(column, where(documentId(), "==", data.user_id));
      getData(q);
      isMount.current = true;
    }
  }, []);

  const equlizer = !userLoading && !userError && userData;

  return (
    <div className="d-flex f-dir-col g-10 box">
      <div className="w-100 d-flex f-wrap j-content-between g-20">
        <div className="d-flex g-8">
          <Publishee
            data={{ user: { ...userData } }}
            loading={loading || !equlizer}
          />
          <Info
            data={{ ...data, user: { ...userData } }}
            loading={loading || !equlizer}
          />
        </div>
        <Categories data={data.categories} loading={loading || !equlizer} />
      </div>
      <Topic data={data.topic} loading={loading || !equlizer} />
      {data.images.length !== 0 && (
        <Images data={data} loading={loading || !equlizer} />
      )}
      <Interaction data={data} loading={loading || !equlizer} />
    </div>
  );
};

export default Post;
