import React from "react";
import { Outlet } from "react-router-dom";

const GradientColorsPage = () => {
  return (
    <div className="text-[#cccccc] px-[7%] mb-10">
      <h1 className="text-center text-7xl my-5">Gradient Colors</h1>
      <Outlet />
    </div>
  );
};

export default GradientColorsPage;
