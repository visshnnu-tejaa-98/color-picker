import React from "react";

const Loader = ({ height }) => {
  return (
    <div className={`h-[${height}]`}>
      <div className={`h-[${height}] flex justify-center items-center`}>
        <div class="loader"></div>
      </div>
    </div>
  );
};

export default Loader;
