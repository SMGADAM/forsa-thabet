import { doc, updateDoc } from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../Constants/Firebase";

const useUpdate = (column) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = useCallback(async ({ id, data }) => {
    setLoading(true);
    setError(null);
    try {
      const col = doc(db, column, id);
      await updateDoc(col, data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  return { updateData, loading, error };
};

export default useUpdate;
