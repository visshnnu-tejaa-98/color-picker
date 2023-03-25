import React, { useContext, useEffect, useState } from "react";
import ColorsContext from "../contexts/colorsContext";
import ColorBlock from "./ColorBlock";
import Footer from "./Footer";

const SolidColorsPage = () => {
  const [colors, setColors] = useState([]);
  const colorsCtx = useContext(ColorsContext);
  const [colorKeys, setColorKeys] = useState([]);
  useEffect(() => {
    setColors(colorsCtx.colorVarients);
    if (colors) {
      setColorKeys(Object.keys(colors));
    }
  }, [colors]);
  return (
    <div className="px-[7%] text-[#cccccc]">
      <h1 className="text-3xl md:text-5xl lg:text-7xl  px-[7%] text-center mt-5">
        Click to Copy
      </h1>
      <h3 className="text-md md:text-lg lg:text-2xl px-[7%] text-center mt-3">
        Always Perfect Color
      </h3>
      {colorKeys &&
        colorKeys.map((c, idx) => (
          <ColorBlock colors={colors[`${c}`]} mainColor={c} key={idx} />
        ))}
    </div>
  );
};

export default SolidColorsPage;
