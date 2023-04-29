import React from "react";
import { Link } from "react-router-dom";

export const AddGradientTemplate = () => {
  return (
    <Link to="/gradient/generate">
      <div
        className={`w-[100%] h-[120px] rounded flex justify-center items-center border-2 border-[#cccccc] border-dashed`}
      >
        <span class="bg-slate-500 rounded px-2 py-1 cursor-pointer material-symbols-outlined">
          add
        </span>
      </div>
    </Link>
  );
};

export const AddPaletteTemplate = () => {
  return (
    <Link to="/gradient/generate">
      <div className="w-[100%] h-[200px] rounded-lg overflow-hidden pallete-tile shadow border-2 border-[#cccccc] border-dashed flex justify-center items-center">
        <span class="bg-slate-500 rounded px-2 py-1 cursor-pointer material-symbols-outlined">
          add
        </span>
      </div>
    </Link>
  );
};
