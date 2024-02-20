import { Label } from "flowbite-react";
import React, { useContext, useState } from "react";
import { twoToneGradientCopyCode } from "../utils/variables";
import DEV_API from "../config/config.development";
import ApiColorsContext from "../contexts/apiColorsContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GenerateGradient = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [color1, setColor1] = useState("#ff0000");
  const [color2, setColor2] = useState("#00ff00");
  const [direction, setDirection] = useState("bottom");
  const [angle, setAngle] = useState(180);
  const [addGradientResponse, setAddGradientResponse] = useState({
    apiStatus: 0,
    data: null,
    errorMessage: null,
  });
  const ApiColorsCtx = useContext(ApiColorsContext);
  const navigate = useNavigate();

  const handleDirection = (e) => {
    setAngle(null);
    setDirection(e.target.value);
  };
  const handleAngle = (e) => {
    setDirection(null);
    setAngle(e.target.value);
  };

  const handleAddGradient = (gradient) => {
    console.log(gradient);
    addGradient(gradient);
  };

  const addGradient = async (gradient) => {
    let data = {
      userId: ApiColorsCtx?.getUser()?._id,
      colors: `${color1};${color2}`,
      direction: gradient.direction,
      angle: gradient.angle,
    };
    let api = DEV_API.addGradient;
    let headers = { Authorization: `Bearer ${ApiColorsCtx.getAuthToken()}` };
    let config = {
      ...api,
      data,
      headers,
    };
    console.log(config);
    setAddGradientResponse({
      apiStatus: 0,
      data: null,
      errorMessage: null,
    });

    return await axios(config)
      .then((response) => {
        try {
          if (response === null) throw new Error("API Error");
          console.log(response);
          return response;
        } catch (error) {
          console.log(error);
        }
      })
      .then((data) => {
        setAddGradientResponse({
          apiStatus: 1,
          data: data,
          errorMessage: null,
        });
        return data;
      })
      .then((data) => {
        navigate("/gradient");
        return;
      })
      .catch((error) => {
        console.log(error);
        let message = "";
        switch (error?.response?.data?.message || error?.message) {
          case "apiError":
            message = "Sonething went wrong while fetching the data";
            break;
          default:
            message = "Something went wrong";
            break;
        }
        setAddGradientResponse({
          apiStatus: -1,
          data: null,
          errorMessage: error?.response?.data?.message || error?.message,
        });
      });
  };

  return (
    <div className="text-[#cccccc] px-[7%] mb-10">
      <h1 className="text-center text-4xl my-7 mb-10">Create Gradient</h1>
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
                <span className="material-symbols-outlined">code</span>
              </div>
            ) : (
              <div className=" flex items-center gap-1 text-green-300">
                <span className="material-symbols-outlined text-green-300">
                  check
                </span>
                <span>Copied!</span>
              </div>
            )}
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className={`w-[200px] items-center justify-center rounded-md bg-[#8425af] px-3.5 py-2.5 mt-10 text-base font-semibold leading-7 text-white hover:bg-[#722097] ${
            !(
              ApiColorsCtx.getAuthToken() &&
              ApiColorsCtx.getAuthToken() !== "undefined"
            ) && "hidden"
          }`}
          onClick={() =>
            handleAddGradient({ color1, color2, direction, angle })
          }
        >
          Generate Gradient
        </button>
      </div>
    </div>
  );
};

export default GenerateGradient;
