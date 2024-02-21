import React from "react";

const Loader = ({ height }) => {
  return (
    <div style={{ height: height }}>
      <div
        className={`flex justify-center items-center`}
        style={{ height: height }}
      >
        <div class="loader"></div>
      </div>
    </div>
  );
};

export default Loader;
