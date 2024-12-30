import React from "react";
import Scroller from "../components/Scroller";
import { collection, where } from "firebase/firestore";
import { db } from "../Constants/Firebase";

const Inquiries = () => {
  return <Scroller type="posts" column={collection(db, "posts")} conditions={where("categories","array-contains","استفسار")} edit_mode/>;
};

export default Inquiries;
