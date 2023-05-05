import React from "react";
import { Link, Outlet } from "react-router-dom";
import GradientTwoTone from "./GradientTwoTone";

const GradientColorsPage = () => {
  return (
    <div className="text-[#cccccc] px-[7%] mb-10">
      <h1 className="text-center text-7xl my-5">Gradient Colors</h1>
      {/* <Outlet /> */}
      <GradientTwoTone />
    </div>
  );
};

export default GradientColorsPage;
