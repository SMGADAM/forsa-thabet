import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../Constants/Firebase";

const useDelete = (column) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const col = doc(db, column, id);
      await deleteDoc(col);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  return { deleteData, loading, error };
};

export default useDelete;
