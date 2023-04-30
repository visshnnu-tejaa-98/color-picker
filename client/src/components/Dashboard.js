import React, { useContext, useEffect } from "react";
import ApiColorsContext from "../contexts/apiColorsContext";
import GradientColorBlock from "./GradientColorBlock";
import { threeTone, twoTone } from "../utils/variables";
import { AddGradientTemplate, AddPaletteTemplate } from "./AddTemplate";
import PalleteColorCopy from "./PalleteColorCopy";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const ApiColorsCtx = useContext(ApiColorsContext);
  useEffect(() => {
    ApiColorsCtx.getAllGradientsByUser();
    ApiColorsCtx.getAllPalette();
  }, []);
  return (
    <div className="px-[7%] text-[#cccccc]">
      <h1 className="text-3xl md:text-5xl lg:text-7xl  px-[7%] text-center mt-5">
        Dashboard
      </h1>
      <div>
        <div className="flex justify-between items-center mt-5">
          <h3 className="text-3xl">Gradients</h3>
          <Link to="/dashboard/gradients">
            <div className="flex items-center text-[#FCD34D]">
              <h3 className="text-lg cursor-pointer">See All</h3>
              <span class="material-symbols-outlined">navigate_next</span>
            </div>
          </Link>
        </div>
        <hr className="opacity-50"></hr>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
            <AddGradientTemplate />
            {ApiColorsCtx?.gradientsByUser &&
              ApiColorsCtx?.gradientsByUser.map((color, idx) => {
                if (idx <= 1) {
                  return (
                    <GradientColorBlock
                      color={color}
                      varient={twoTone}
                      key={color}
                    />
                  );
                }
              })}
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mt-5">
          <h3 className="text-3xl">Palette</h3>
          <h3 className="text-lg cursor-pointer text-[#FCD34D]">See All</h3>
        </div>
        <hr className="opacity-50"></hr>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-8">
            <AddPaletteTemplate />
            {ApiColorsCtx?.palette &&
              ApiColorsCtx.palette.map((color) => (
                <div
                  key={color}
                  className="w-[100%] h-[200px] bg-teal-100 rounded-lg overflow-hidden pallete-tile shadow"
                >
                  <div
                    style={{ backgroundColor: color[0] }}
                    className="w-[100%] h-[75px] bg-teal-500 relative pallete-color"
                  >
                    <PalleteColorCopy color={color[0]} />
                  </div>
                  <div
                    style={{ backgroundColor: color[1] }}
                    className="w-[100%] h-[55px] bg-teal-300 relative pallete-color"
                  >
                    <PalleteColorCopy color={color[1]} />
                  </div>
                  <div
                    style={{ backgroundColor: color[2] }}
                    className="w-[100%] h-[40px] bg-teal-200 relative pallete-color"
                  >
                    <PalleteColorCopy color={color[2]} />
                  </div>
                  <div
                    style={{ backgroundColor: color[3] }}
                    className="w-[100%] h-[30px] bg-teal-100 relative pallete-color"
                  >
                    <PalleteColorCopy color={color[3]} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
