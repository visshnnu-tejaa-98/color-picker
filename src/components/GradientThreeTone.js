import React from "react";
import { gradientColorMapping } from "../utils/gradientColors";
import { threeTone } from "../utils/variables";
import GradientColorBlock from "./GradientColorBlock";

const GradientThreeTone = () => {
  return (
    <div>
      <h2 className="text-center text-3xl mt-12 mb-10">Feeling Three Tone</h2>
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

export default GradientThreeTone;
