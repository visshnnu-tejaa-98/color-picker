import React from "react";
import { Link } from "react-router-dom";
import { gradientColorMapping } from "../utils/gradientColors";
import { threeTone, twoTone } from "../utils/variables";
import GradientColorBlock from "./GradientColorBlock";

const GradientColorsPage = () => {
  return (
    <div className="text-[#cccccc] px-[7%] mb-10">
      <h1 className="text-center text-7xl my-5">Gradient Colors</h1>
      <h2 className="text-center text-3xl mt-12 mb-10">Feeling Two Tone</h2>
      <div className="flex justify-center">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {gradientColorMapping.twoTone.map((color) => (
              <GradientColorBlock color={color} varient={twoTone} />
            ))}
          </div>
        </div>
      </div>
      <h2 className="text-center text-3xl mt-20 mb-10">Feeling Three Tone</h2>
      <div className="flex justify-center">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {gradientColorMapping.threeTone.map((color) => (
              <span className="relative inline-block box">
                <GradientColorBlock color={color} varient={threeTone} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientColorsPage;
