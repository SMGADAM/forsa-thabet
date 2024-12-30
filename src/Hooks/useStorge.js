import { useCallback, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  limitToLast,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../Constants/Firebase";

const useStorge = (colName, limit) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const PostsCol = collection(db, colName);
      const q = query(PostsCol, orderBy("date"), limitToLast(limit));
      const res = await getDocs(q);
      const resData = res.docs.map((doc) => doc.data());
      if (resData && resData.length) {
        setData(resData);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  const addData = useCallback(async (data, id) => {
    setLoading(true);
    setError(null);
    try {
      const PostsCol = collection(db, colName);
      setDoc(id ? doc(PostsCol, id) : PostsCol, { ...data });
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);
  return { getData, addData, loading, error, data };
};

export default useStorge;
