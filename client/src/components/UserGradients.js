import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiColorsContext from "../contexts/apiColorsContext";
import GradientColorBlock from "./GradientColorBlock";
import { twoTone } from "../utils/variables";

const UserGradients = () => {
  const ApiColorsCtx = useContext(ApiColorsContext);
  const navigate = useNavigate();
  useEffect(() => {
    ApiColorsCtx.getAllGradientsByUser();
  }, []);
  return (
    <div className="px-[7%] text-[#cccccc]">
      <div className="flex justify-between items-center">
        <span
          class="material-symbols-outlined cursor-pointer hover:text-[#FCD34D]"
          title="Back"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
        <h2 className="text-center text-3xl mt-10 mb-10">Your Gradients</h2>
        <span class="material-symbols-outlined invisible">arrow_back</span>
      </div>
      <div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
            {/* <AddGradientTemplate /> */}
            {ApiColorsCtx?.gradientsByUser &&
              ApiColorsCtx?.gradientsByUser.map((color, idx) => (
                <GradientColorBlock
                  color={color}
                  varient={twoTone}
                  key={color}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGradients;
