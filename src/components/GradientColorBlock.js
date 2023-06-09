import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  twoTone,
  threeTone,
  twoToneGradientCopyCode,
  threeToneGradientCopyCode,
} from "../utils/variables";
import GradientColorCodeCopy from "./GradientColorCodeCopy";

// props, color comes in the form of array : ["#1c1c1c","#cca1c3"]
const GradientColorBlock = ({ color, varient, ...props }) => {
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();
  const handleOnClick = (e) => {
    console.log(props.info);
    if (props.info && props.info._id && e.target.tagName === "DIV") {
      navigate(`/gradient/gradientDetails/${props.info._id}`);
    }
  };
  return (
    <span className="relative inline-block box color-tile">
      {varient === twoTone && (
        <div>
          <div
            className={`w-[100%] h-[120px] rounded bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center cursor-pointer gradient-tile`}
            style={{
              background: `linear-gradient(to right, ${color[0]} , ${color[1]})`,
            }}
            onClick={(e) => handleOnClick(e)}
          >
            <span
              className="bg-[#333333] rounded px-2 py-1 cursor-pointer"
              onClick={() => {
                setIsCopied(true);
                navigator.clipboard.writeText(twoToneGradientCopyCode(color));
                setTimeout(() => {
                  setIsCopied(false);
                }, 500);
              }}
            >
              {!isCopied ? (
                <div className=" flex items-center gap-1 ">
                  <span>Copy </span>
                  <span className="material-symbols-outlined">code</span>
                </div>
              ) : (
                <div className=" flex items-center gap-1 text-[#00ff00]">
                  <span className="material-symbols-outlined text-[#00ff00]">
                    check
                  </span>
                  <span>Copied!</span>
                </div>
              )}
            </span>
          </div>
          <span className="flex items-center justify-center gap-4 my-1">
            <GradientColorCodeCopy clr={color[0]} />
            <span className="material-symbols-outlined">arrow_right_alt</span>
            <GradientColorCodeCopy clr={color[1]} />
          </span>
        </div>
      )}
      {varient === threeTone && (
        <div>
          <div
            className={`w-[100%] h-[120px] rounded bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center gradient-tile`}
            style={{
              background: `linear-gradient(to right, ${color[0]} , ${color[1]}, ${color[2]})`,
            }}
          >
            <span
              className="bg-[#333333] rounded px-2 py-1 cursor-pointer"
              onClick={() => {
                setIsCopied(true);
                navigator.clipboard.writeText(threeToneGradientCopyCode(color));
                setTimeout(() => {
                  setIsCopied(false);
                }, 500);
              }}
            >
              {!isCopied ? (
                <div className="flex items-center gap-1">
                  <span>Copy </span>
                  <span className="material-symbols-outlined">code</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-[#00ff00]">
                  <span className="material-symbols-outlined text-[#00ff00]">
                    check
                  </span>
                  <span>Copied!</span>
                </div>
              )}
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 my-1">
            <GradientColorCodeCopy clr={color[0]} />
            {/* <span className="material-symbols-outlined">arrow_right_alt</span>
            <GradientColorCodeCopy clr={color[1]} /> */}
            <span className="material-symbols-outlined">arrow_right_alt</span>
            <GradientColorCodeCopy clr={color[2]} />
          </div>
        </div>
      )}
    </span>
  );
};

export default GradientColorBlock;
