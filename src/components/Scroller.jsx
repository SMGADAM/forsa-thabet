import { useCallback, useContext, useEffect, useRef } from "react";
import Publisher from "../components/Publisher";
import Post from "../components/Post";
import User from "./User";
import Comment from "./Comment";
import useFetchCol from "../Hooks/useFetchCol";
import { RefreshContext } from "../Contexts/RefreshContext";

//Database
import { limit, orderBy, query, startAfter } from "firebase/firestore";

//Defults
import { default_post } from "../Constants/Defualts";

const Scroller = ({
  type = "posts",
  column,
  conditions,
  refresh,
  sendDataToParent,
  edit_mode
}) => {
  const { refresh: l_refresh, setRefresh: l_setRefresh } =
    useContext(RefreshContext);

  const { loading, fetching, error, data, lastDoc, getData, getNextData } =
    useFetchCol();

  const fetch = useCallback(() => {
    //if (!data) {
    const q = query(
      column,
      conditions && conditions,
      orderBy("created_at", "desc"),
      limit(12)
    );
    getData(q);
    //}
  }, [data, getData]);

  const fetchNext = useCallback(() => {
    if (data && !loading && !fetching && lastDoc) {
      const q = query(
        column,
        conditions && conditions,
        orderBy("created_at", "desc"),
        limit(12),
        startAfter(lastDoc)
      );
      getNextData(q);
    }
  }, [data, getNextData, loading, fetching, lastDoc]);

  const isMount = useRef(false);
  useEffect(() => {
    if (!isMount.current) {
      fetch();
      isMount.current = true;
    }
  }, []);

  useEffect(() => {
    if (refresh) {
      fetch();
      sendDataToParent(false);
    }
  }, [refresh]);

  useEffect(() => {
    if (l_refresh) {
      fetch();
      l_setRefresh(false);
    }
  }, [l_refresh]);

  const observerRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const blogObserver = entries[0];
      if (blogObserver.isIntersecting) {
        fetchNext();
      }
    });
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [data, observerRef, fetchNext]);

  return (
    <div className="d-flex f-dir-col g-10">
      {type === "posts" && !edit_mode ? <Publisher /> : null}

      {!loading && !error && data && data.length !== 0
        ? data.map((post) =>
            type === "posts" ? (
              <Post key={post.id} data={post} />
            ) : type === "users" ? (
              <User key={post.id} data={{ user: { ...post } }} />
            ) : type === "comments" ? (
              <Comment key={post.id} data={post} />
            ) : null
          )
        : null}

      {loading && !error ? (
        type === "posts" ? (
          <>
            <Post data={default_post} loading />
            <Post data={default_post} loading />
            <Post data={default_post} loading />
          </>
        ) : type === "users" ? (
          <>
            <User data={default_post} loading />
            <User data={default_post} loading />
            <User data={default_post} loading />
          </>
        ) : type === "comments" ? (
          <>
            <Comment data={default_post} loading />
            <Comment data={default_post} loading />
            <Comment data={default_post} loading />
          </>
        ) : null
      ) : null}

      {!loading && !error && data && data.length === 0 ? (
        type === "posts" ? (
          <div className="box font-bold">لا يوجد منشورات</div>
        ) : type === "users" ? (
          <div className="box font-bold">لا يوجد طلبات صداقة</div>
        ) : type === "comments" ? (
          <div className="box font-bold">لا يوجد تعليقات</div>
        ) : null
      ) : null}

      {error ? <div className="box error">{error}</div> : null}

      <div className="w-100" ref={observerRef}></div>
    </div>
  );
};

export default Scroller;
