import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PalleteColorCopy from "./PalleteColorCopy";
import ApiColorsContext from "../contexts/apiColorsContext";

const UserPalette = () => {
  const ApiColorsCtx = useContext(ApiColorsContext);
  const navigate = useNavigate();
  useEffect(() => {
    ApiColorsCtx.getPaletteByUser();
  }, []);
  const handleOnClick = (e, color) => {
    console.log(color);
    if (color._id && e.target.tagName === "DIV") {
      navigate(`/palette/paletteDetails/${color._id}`);
    }
  };
  return (
    <div className="px-[7%] text-[#cccccc]">
      <div className="flex justify-between items-center">
        <span
          className="material-symbols-outlined cursor-pointer hover:text-[#FCD34D]"
          title="Back"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
        <h2 className="text-center text-3xl mt-10 mb-10">Your Palette</h2>
        <span className="material-symbols-outlined invisible">arrow_back</span>
      </div>
      <div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {ApiColorsCtx?.paletteByUser &&
              [...ApiColorsCtx.paletteByUser].map((color, idx) => (
                <div
                  key={idx}
                  className="w-[100%] h-[200px] bg-teal-100 rounded-lg overflow-hidden pallete-tile shadow cursor-pointer"
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

export default UserPalette;
