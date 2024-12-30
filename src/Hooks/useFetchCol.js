import { useCallback, useState } from "react";
import { getDocs } from "firebase/firestore";

const useFetchCol = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setfetching] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [lastDoc, setlastDoc] = useState(null);

  const getData = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getDocs(query);
      const resData = res.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
          created_at: docData.created_at.toDate(),
          user: {},
        };
      });
      setData(resData);
      setlastDoc(res.docs[res.docs.length - 1]);
    } catch (error) {
      console.log(error.message);

      setError(error.message);
    }
    setLoading(false);
  }, []);

  const getNextData = useCallback(async (query) => {
    setfetching(true);
    setError(null);
    try {
      const res = await getDocs(query);
      const resData = res.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
          created_at: docData.created_at.toDate(),
        };
      });
      setData((data) => [...data, ...resData]);
      setlastDoc(res.docs[res.docs.length - 1]);
    } catch (error) {
      setError(error.message);
    }
    setfetching(false);
  }, []);
  return { loading, fetching, error, data, lastDoc, getData, getNextData };
};

export default useFetchCol;
