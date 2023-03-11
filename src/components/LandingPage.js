import React, { useContext, useEffect } from "react";
import colorsContext from "../contexts/colorsContext";
import Navbar from "./Navbar";

const LandingPage = () => {
  const colorsCtx = useContext(colorsContext);
  useEffect(() => {
    colorsCtx.generateColors();
  }, []);
  return (
    <div className="mx-auto">
      <Navbar />
    </div>
  );
};

export default LandingPage;
