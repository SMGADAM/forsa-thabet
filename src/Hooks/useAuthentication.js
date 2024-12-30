import { useCallback, useEffect, useState } from "react";
// import useStorge from "./useStorge";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../Constants/Firebase";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { collection, getDocs, query, where } from "firebase/firestore";

const useAuthentication = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      if(user){
        setUser(user);
        Cookies.set('user', JSON.stringify(user));
        const column = collection(db, "users");
        const q = query(column, where("email", "==", user.email));
        const res = await getDocs(q);
        const docData = res.docs[0];
        Cookies.set('profile', JSON.stringify({id:docData.id, ...docData.data()}));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);

  // const { addData } = useStorge("users");
  const Signup = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  const Login = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  const Logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
      Cookies.remove('user');
      Cookies.remove('profile');
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);
  return {
    Signup,
    Login,
    Logout,
    loading,
    error,
    user,
    isAuthor: !!user,
  };
};

export default useAuthentication;
