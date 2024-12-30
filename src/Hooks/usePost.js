import { addDoc, collection } from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../Constants/Firebase";

const usePost = (column) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      await addDoc(column, data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  return { postData, loading, error };
};

export default usePost;
