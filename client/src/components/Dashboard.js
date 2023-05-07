import React, { useContext, useEffect } from "react";
import ApiColorsContext from "../contexts/apiColorsContext";
import GradientColorBlock from "./GradientColorBlock";
import { threeTone, twoTone } from "../utils/variables";
import { AddGradientTemplate, AddPaletteTemplate } from "./AddTemplate";
import PalleteColorCopy from "./PalleteColorCopy";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const ApiColorsCtx = useContext(ApiColorsContext);
  const navigate = useNavigate();
  useEffect(() => {
    ApiColorsCtx.getAllGradientsByUser();
    ApiColorsCtx.getPaletteByUser();
  }, []);

  const handleOnClick = (e, color) => {
    if (color._id && e.target.tagName === "DIV") {
      navigate(`/palette/paletteDetails/${color._id}`);
    }
  };
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
              <span className="material-symbols-outlined">navigate_next</span>
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
                      color={color.colors}
                      varient={twoTone}
                      key={color._id}
                      info={color}
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
          <Link to="/dashboard/palette">
            <div className="flex items-center text-[#FCD34D]">
              <h3 className="text-lg cursor-pointer">See All</h3>
              <span className="material-symbols-outlined">navigate_next</span>
            </div>
          </Link>
        </div>
        <hr className="opacity-50"></hr>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-8">
            <AddPaletteTemplate />
            {ApiColorsCtx?.paletteByUser &&
              [...ApiColorsCtx.paletteByUser].map((color, idx) => {
                if (idx <= 2) {
                  return (
                    <div
                      key={idx}
                      className="w-[100%] h-[200px] bg-teal-100 rounded-lg overflow-hidden pallete-tile shadow"
                      onClick={(e) => handleOnClick(e, color)}
                    >
                      <div
                        className="w-[100%] h-[75px] bg-teal-500 relative pallete-color"
                        style={{
                          backgroundColor: color?.palette[0] || color[0],
                        }}
                      >
                        <PalleteColorCopy
                          color={color?.palette[0] || color[0]}
                        />
                      </div>
                      <div
                        className="w-[100%] h-[55px] bg-teal-300 relative pallete-color"
                        style={{
                          backgroundColor: color?.palette[1]
                            ? color?.palette[1]
                            : color[1],
                        }}
                      >
                        <PalleteColorCopy
                          color={
                            color?.palette[1] ? color?.palette[1] : color[1]
                          }
                        />
                      </div>
                      <div
                        className="w-[100%] h-[40px] bg-teal-200 relative pallete-color"
                        style={{
                          backgroundColor: color?.palette[2]
                            ? color?.palette[2]
                            : color[2],
                        }}
                      >
                        <PalleteColorCopy
                          color={
                            color?.palette[2] ? color?.palette[2] : color[2]
                          }
                        />
                      </div>
                      <div
                        className="w-[100%] h-[30px] bg-teal-100 relative pallete-color"
                        style={{
                          backgroundColor: color?.palette[3]
                            ? color?.palette[3]
                            : color[3],
                        }}
                      >
                        <PalleteColorCopy
                          color={
                            color?.palette[3] ? color?.palette[3] : color[3]
                          }
                        />
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
