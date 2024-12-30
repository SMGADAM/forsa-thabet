import { useCallback, useState } from "react";
import { getDocs } from "firebase/firestore";

const useFetchDocParam = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getData = useCallback(async (conditions) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getDocs(conditions);
      const resData = res.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
          created_at: docData.created_at.toDate(),
        };
      });
      if (resData && resData.length) {
        setData(resData[0]);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);
  return { getData, loading, error, data };
};

export default useFetchDocParam;
