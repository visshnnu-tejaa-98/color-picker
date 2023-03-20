import React from "react";
import { Link, Outlet } from "react-router-dom";

const GradientColorsPage = () => {
  return (
    <div className="text-[#cccccc] px-[7%] mb-10">
      <h1 className="text-center text-7xl my-5">Gradient Colors</h1>
      <button className="bg-slate-500 py-1 px-2 rounded mr-2">
        <Link
          to=""
          className={({ isActive }) =>
            isActive
              ? "btn"
              : "block py-2 pl-3 pr-4 text-[#CCCCCC] hover:text-[#1c1c1c] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#dddddd] md:p-0 my-1"
          }
        >
          Check Two Tone
        </Link>
      </button>
      <button className="bg-slate-500 py-1 px-2 rounded">
        <Link
          to="threetone"
          className={({ isActive }) =>
            isActive
              ? "btn"
              : "block py-2 pl-3 pr-4 text-[#CCCCCC] hover:text-[#1c1c1c] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#dddddd] md:p-0 my-1"
          }
        >
          Check Three Tone
        </Link>
      </button>
      <Outlet />
    </div>
  );
};

export default GradientColorsPage;
