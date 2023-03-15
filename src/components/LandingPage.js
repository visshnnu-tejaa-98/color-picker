import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import colorsContext from "../contexts/colorsContext";
import Footer from "./Footer";
import Navbar from "./Navbar";

const LandingPage = () => {
  const colorsCtx = useContext(colorsContext);
  useEffect(() => {
    colorsCtx.generateColors();
  }, []);
  return (
    <div className="mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LandingPage;
