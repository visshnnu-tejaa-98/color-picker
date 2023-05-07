import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApiColorsContext from "../contexts/apiColorsContext";
import DEV_API from "../config/config.development";
import axios from "axios";
import { twoToneGradientCopyCode } from "../utils/variables";

const GradientDetails = () => {
  const [getGradientByIdResponse, setGradientByIdResponse] = useState({
    apiStatus: 0,
    data: null,
    errorMessage: null,
  });
  const [isCopied, setIsCopied] = useState(false);
  const ApiColorsCtx = useContext(ApiColorsContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    getGradientById(location?.pathname?.split("/")[3], true); //true indicates to populate user details also
  }, []);

  const getGradientById = async (id, populateUser) => {
    let queryParams = { id, populateUser };
    let data = { id, populateUser };
    let headers = { Authorization: `Bearer ${ApiColorsCtx.getAuthToken()}` };
    let api = DEV_API.getGradientById;
    let config = {
      ...api,
      body: data,
      data,
      headers,
      params: queryParams,
    };
    setGradientByIdResponse({
      apiStatus: 0,
      data: null,
      errorMessage: null,
    });
    return axios(config)
      .then((response) => {
        try {
          if (response === null) throw new Error("API Error");
          return response?.data.gradient;
        } catch (error) {
          console.log(error);
        }
      })
      .then((data) => {
        return setGradientByIdResponse({
          apiStatus: 1,
          data: data,
          errorMessage: null,
        });
      })
      .catch((error) => {
        console.log(error);
        let message = "";
        switch (error.message) {
          case "apiError":
            message = "Sonething went wrong while fetching the data";
            break;
          default:
            message = "Something went wrong";
            break;
        }
        setGradientByIdResponse({
          apiStatus: -1,
          data: null,
          errorMessage: error.message,
        });
      });
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
        <h2 className="text-center text-3xl mt-10 mb-10">Your Gradients</h2>
        <span className="material-symbols-outlined invisible">arrow_back</span>
      </div>
      {getGradientByIdResponse.apiStatus === 1 && (
        <div className="">
          <div
            className={`w-[100%] h-[250px] rounded bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center gradient-tile`}
            style={{
              background: getGradientByIdResponse.data[0].angle
                ? `linear-gradient(${getGradientByIdResponse.data[0].angle}deg, ${getGradientByIdResponse.data[0].colors[0]}, ${getGradientByIdResponse.data[0].colors[1]})`
                : `linear-gradient(to ${getGradientByIdResponse.data[0].direction}, ${getGradientByIdResponse.data[0].colors[0]}, ${getGradientByIdResponse.data[0].colors[1]})`,
            }}
          >
            <span
              className="bg-slate-500 rounded px-2 py-1 cursor-pointer"
              onClick={() => {
                setIsCopied(true);
                navigator.clipboard.writeText(
                  twoToneGradientCopyCode([
                    getGradientByIdResponse.data[0].colors[0],
                    getGradientByIdResponse.data[0].colors[1],
                  ])
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
          <div>
            <h2 className="text-left text-3xl mt-5 mb-5">Details</h2>
            <div className="grid grid-cols-3 gap-7">
              <p className="p-2 border-[1px] border-[#aaaaaa] border-opacity-75">
                <span className=""> Color One:</span>
                <span className="pl-2 font-semibold tracking-wider">
                  {getGradientByIdResponse.data[0].colors[0].toUpperCase()}
                </span>
              </p>
              <p className="p-2 border-[1px] border-[#aaaaaa] border-opacity-75">
                <span className=""> Color Two:</span>
                <span className="pl-2 font-semibold tracking-wider">
                  {getGradientByIdResponse.data[0].colors[0].toUpperCase()}
                </span>
              </p>
              {getGradientByIdResponse.data[0].direction && (
                <p className="p-2 border-[1px] border-[#aaaaaa] border-opacity-75">
                  <span className=""> Direction:</span>
                  <span className="pl-2 font-semibold tracking-wider">
                    {getGradientByIdResponse.data[0].direction.toUpperCase()}
                  </span>
                </p>
              )}
              {getGradientByIdResponse.data[0]?.angle && (
                <p className="p-2 border-[1px] border-[#aaaaaa] border-opacity-75">
                  <span className=""> Angle:</span>
                  <span className="pl-2 font-semibold tracking-wider">
                    {getGradientByIdResponse.data[0].angle + "deg"}
                  </span>
                </p>
              )}
              {getGradientByIdResponse.data[0].userId.name && (
                <p className="p-2 border-[1px] border-[#aaaaaa] border-opacity-75">
                  <span className=""> User:</span>
                  <span className="pl-2 font-semibold tracking-wider">
                    {getGradientByIdResponse.data[0].userId.name}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradientDetails;
