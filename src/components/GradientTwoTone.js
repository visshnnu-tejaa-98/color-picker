import React from "react";
import { gradientColorMapping } from "../utils/gradientColors";
import { twoTone } from "../utils/variables";
import GradientColorBlock from "./GradientColorBlock";

const GradientTwoTone = ({ msg }) => {
  return (
    <div>
      <h2 className="text-center text-3xl mt-12 mb-10">Feeling Two Tone</h2>
      <div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gradientColorMapping.twoTone.map((color) => (
              <GradientColorBlock color={color} varient={twoTone} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientTwoTone;
