import React, { useContext, useEffect } from "react";
import colorsContext from "../contexts/colorsContext";

const LandingPage = () => {
  const colorsCtx = useContext(colorsContext);
  useEffect(() => {
    colorsCtx.generateColors();
  }, []);
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <h1 className="font-semibold text-4xl">Hello UI Color Picker😀</h1>
    </div>
  );
};

export default LandingPage;
