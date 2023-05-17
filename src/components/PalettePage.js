import React, { useContext, useEffect } from "react";
import { palletColors } from "../utils/palleteColors";
import PalleteColorCopy from "./PalleteColorCopy";
import ApiColorsContext from "../contexts/apiColorsContext";
import { useNavigate } from "react-router-dom";

const PalettePage = () => {
  const ApiColorsCtx = useContext(ApiColorsContext);
  const navigate = useNavigate();
  useEffect(() => {
    ApiColorsCtx.getAllPalette();
  }, []);
  const handleOnClick = (e, color) => {
    if (color._id && e.target.tagName === "DIV") {
      navigate(`/palette/paletteDetails/${color._id}`);
    }
  };
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
              [...ApiColorsCtx.palette].map((color, idx) => (
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
                    <PalleteColorCopy color={color?.palette[0] || color[0]} />
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
                      color={color?.palette[1] ? color?.palette[1] : color[1]}
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
                      color={color?.palette[2] ? color?.palette[2] : color[2]}
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
                      color={color?.palette[3] ? color?.palette[3] : color[3]}
                    />
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
