//import { useState } from "react";
import clsx from "clsx";

const Topic = ({ data, loading = false }) => {
  return (
    <div
      className={clsx("color-light-7", { loading })}
      dangerouslySetInnerHTML={{
        __html: loading
          ? `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit laboriosam praesentium.`
          : data,
      }}
    ></div>
  );
};

export default Topic;
