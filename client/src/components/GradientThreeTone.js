import React, { useContext, useEffect } from "react";
import { gradientColorMapping } from "../utils/gradientColors";
import { threeTone } from "../utils/variables";
import GradientColorBlock from "./GradientColorBlock";
import ApiColorsContext from "../contexts/apiColorsContext";

const GradientThreeTone = () => {
  const ApiColorsCtx = useContext(ApiColorsContext);
  useEffect(() => {
    ApiColorsCtx.getAllGradients();
  }, []);
  return (
    <div>
      <h2 className="text-center text-3xl mt-12 mb-10">Feeling Three Tone</h2>
      <div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ApiColorsCtx?.twoToneColors &&
              [
                ...ApiColorsCtx.threeToneColors,
                ...gradientColorMapping.threeTone,
              ].map((color) => (
                <GradientColorBlock color={color} varient={threeTone} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientThreeTone;
