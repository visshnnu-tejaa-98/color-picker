import { Label } from "flowbite-react";
import React, { useState } from "react";
import { twoToneGradientCopyCode } from "../utils/variables";

const GenerateGradient = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [color1, setColor1] = useState("#ff0000");
  const [color2, setColor2] = useState("#00ff00");
  const [direction, setDirection] = useState("bottom");
  const [angle, setAngle] = useState(180);

  const handleDirection = (e) => {
    setAngle(null);
    setDirection(e.target.value);
  };
  const handleAngle = (e) => {
    setDirection(null);
    setAngle(e.target.value);
  };
  return (
    <div className="text-[#cccccc] px-[7%] mb-10">
      <h2 className="text-center text-3xl mt-12 mb-10">Generate Gradient</h2>
      <div className="flex flex-col items-center gap-5 md:flex md:justify-between md:flex-row">
        <table>
          <tbody>
            <tr>
              <th className="w-[100px] text-left h-[50px]">Color One</th>
              <td>
                <div className="text-lg">
                  <input
                    type="color"
                    name="color1"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th className="w-[100px] text-left h-[50px]">Color Two</th>
              <td>
                <div className="text-lg">
                  <input
                    type="color"
                    name="color2"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th className="w-[100px] text-left h-[50px]">Direction</th>
              <td>
                <div className="text-lg">
                  <select
                    name="direction"
                    id="direction"
                    onChange={(e) => handleDirection(e)}
                    className="bg-[#cccccc] text-[#1c1c1c] rounded border-transparent focus:border-transparent focus:ring-0 py-2"
                  >
                    <option
                      className="text-[#cccccc] bg-[#1c1c1c]"
                      value="bottom"
                    >
                      Bottom
                    </option>
                    <option className="text-[#cccccc] bg-[#1c1c1c]" value="top">
                      Top
                    </option>
                    <option
                      className="text-[#cccccc] bg-[#1c1c1c]"
                      value="left"
                    >
                      Left
                    </option>
                    <option
                      className="text-[#cccccc] bg-[#1c1c1c]"
                      value="right"
                    >
                      Right
                    </option>
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <th className="w-[100px] text-left h-[50px]">Angle</th>
              <td>
                <div className="text-lg slidecontainer">
                  <input
                    type="range"
                    name="angle"
                    id="angle"
                    min="0"
                    max="360"
                    step="1"
                    className="slider"
                    value={angle}
                    onChange={(e) => handleAngle(e)}
                  />
                  <span className="ml-2">{angle && angle + "°"}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          className={`w-[300px] h-[200px] rounded bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center gradient-tile`}
          style={{
            background: angle
              ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
              : `linear-gradient(to ${direction}, ${color1}, ${color2})`,
          }}
        >
          <span
            className="bg-slate-500 rounded px-2 py-1 cursor-pointer"
            onClick={() => {
              setIsCopied(true);
              navigator.clipboard.writeText(
                twoToneGradientCopyCode([color1, color2])
              );
              setTimeout(() => {
                setIsCopied(false);
              }, 500);
            }}
          >
            {!isCopied ? (
              <div className=" flex items-center gap-1 ">
                <span>Copy </span>
                <span class="material-symbols-outlined">code</span>
              </div>
            ) : (
              <div className=" flex items-center gap-1 text-green-300">
                <span class="material-symbols-outlined text-green-300">
                  check
                </span>
                <span>Copied!</span>
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GenerateGradient;
