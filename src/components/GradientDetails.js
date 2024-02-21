import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ApiColorsContext from "../contexts/apiColorsContext";
import DEV_API from "../config/config.development";
import axios from "axios";
import { twoToneGradientCopyCode } from "../utils/variables";
import Loader from "./Loader";
import ReactTimeAgo from "react-time-ago";

const GradientDetails = () => {
  const [getGradientByIdResponse, setGradientByIdResponse] = useState({
    apiStatus: 0,
    data: null,
    errorMessage: null,
  });
  const [deleteGradientResponse, setDeleteGradientResponse] = useState({
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

  const handleDelete = (id, email) => {
    deleteGradient(id, email);
  };

  const deleteGradient = async (id, email) => {
    let data = { id, email };
    let api = DEV_API.deleteGradient;
    let headers = { Authorization: `Bearer ${ApiColorsCtx.getAuthToken()}` };
    let config = {
      ...api,
      data,
      headers,
    };
    setDeleteGradientResponse({
      apiStatus: 0,
      data: null,
      errorMessage: null,
    });
    return await axios(config)
      .then((response) => {
        try {
          if (response === null) throw new Error("API Error");
          return response;
        } catch (error) {
          console.log(error);
        }
      })
      .then((data) => {
        setDeleteGradientResponse({
          apiStatus: 1,
          data: data,
          errorMessage: null,
        });
        return data;
      })
      .then((data) => navigate(-1))
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
        setDeleteGradientResponse({
          apiStatus: -1,
          data: null,
          errorMessage: error?.response?.data?.message || error?.message,
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
        <h2 className="text-center text-3xl mt-10 mb-10">Gradient Details</h2>
        <span className="material-symbols-outlined invisible">arrow_back</span>
      </div>
      {getGradientByIdResponse.apiStatus === 0 && <Loader height={"300px"} />}
      {getGradientByIdResponse.apiStatus === 1 && (
        <div className="mb-5">
          <div
            className={`w-[100%] h-[250px] rounded bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center gradient-tile`}
            style={{
              width: "100%",
              height: "250px",
              borderRadius: "7px",
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
                  {getGradientByIdResponse.data[0].colors[1].toUpperCase()}
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
                  <span className="">Angle:</span>
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
              {getGradientByIdResponse.data[0].userId.name && (
                <p className="p-2 border-[1px] border-[#aaaaaa] border-opacity-75">
                  <span className="">Created At:</span>
                  <span className="pl-2 font-semibold tracking-wider">
                    <ReactTimeAgo
                      date={getGradientByIdResponse.data[0].createdAt}
                      locale="en-US"
                    />
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {getGradientByIdResponse.apiStatus === 1 &&
        ApiColorsCtx?.getUser()?.email ===
          getGradientByIdResponse.data[0].userId.email && (
          <div className="my-8">
            <Link
              to={`/editGradient/${getGradientByIdResponse.data[0]._id}`}
              className=""
            >
              <span className="py-1.5 px-3 bg-[#7E22CE] text-xl font-semibold rounded hover:text-[#cccccc] border border-[#7E22CE] hover:bg-transparent hover:border-[#cccccc] hover:ease-in-out hover:duration-300 cursor-pointer">
                <span>Edit</span>
              </span>
            </Link>
            <span
              className="py-1.5 ml-4 px-3 bg-[#7E22CE] text-xl font-semibold rounded hover:text-[#cccccc] border border-[#7E22CE] hover:bg-transparent hover:border-[#cccccc] hover:ease-in-out hover:duration-300 cursor-pointer"
              onClick={() =>
                handleDelete(
                  getGradientByIdResponse.data[0]._id,
                  ApiColorsCtx?.getUser()?.email
                )
              }
            >
              <span>Delete</span>
            </span>
          </div>
        )}
    </div>
  );
};

export default GradientDetails;
