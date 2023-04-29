import React, { useContext, useEffect } from "react";
import { palletColors } from "../utils/palleteColors";
import PalleteColorCopy from "./PalleteColorCopy";
import ApiColorsContext from "../contexts/apiColorsContext";

const PalettePage = () => {
  const ApiColorsCtx = useContext(ApiColorsContext);
  useEffect(() => {
    ApiColorsCtx.getAllPalette();
  }, []);
  return (
    <div className="px-[7%] text-[#cccccc]">
      <h1 className="text-3xl md:text-5xl lg:text-7xl  px-[7%] text-center mt-5">
        Color Palette
      </h1>
      <h2 className="text-center text-3xl mt-12 mb-10">Click to Copy!</h2>
      <div className="my-12">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {palletColors &&
              ApiColorsCtx?.palette &&
              [...ApiColorsCtx.palette, ...palletColors].map((color) => (
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

export default PalettePage;
