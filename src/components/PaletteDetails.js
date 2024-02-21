import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ApiColorsContext from "../contexts/apiColorsContext";
import DEV_API from "../config/config.development";
import axios from "axios";
import PalleteColorCopy from "./PalleteColorCopy";
import Loader from "./Loader";
import ReactTimeAgo from "react-time-ago";

const PaletteDetails = () => {
  const [getPaletteByIdResponse, setPaletteByIdResponse] = useState({
    apiStatus: 0,
    data: null,
    errorMessage: null,
  });
  const [deletePaletteResponse, setPaletteGradientResponse] = useState({
    apiStatus: 0,
    data: null,
    errorMessage: null,
  });
  const ApiColorsCtx = useContext(ApiColorsContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    getPaletteById(location?.pathname?.split("/")[3], true); //true indicates to populate user details also
  }, []);

  const getPaletteById = async (id, populateUser) => {
    let queryParams = { id, populateUser };
    let data = { id, populateUser };
    let headers = { Authorization: `Bearer ${ApiColorsCtx.getAuthToken()}` };
    let api = DEV_API.getPaletteById;
    let config = {
      ...api,
      data,
      headers,
    };
    console.log(config);
    setPaletteByIdResponse({
      apiStatus: 0,
      data: null,
      errorMessage: null,
    });
    return axios(config)
      .then((response) => {
        try {
          if (response === null) throw new Error("API Error");
          console.log(response);
          return response?.data.palette;
        } catch (error) {
          console.log(error);
        }
      })
      .then((data) => {
        return setPaletteByIdResponse({
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
        setPaletteByIdResponse({
          apiStatus: -1,
          data: null,
          errorMessage: error.message,
        });
      });
  };

  const handleDelete = (id, email) => {
    console.log(id, email);
    deleteGradient(id, email);
  };

  const deleteGradient = async (id, email) => {
    let data = { id, email };
    let api = DEV_API.deletePalette;
    let headers = { Authorization: `Bearer ${ApiColorsCtx.getAuthToken()}` };
    let config = {
      ...api,
      data,
      headers,
    };
    setPaletteGradientResponse({
      apiStatus: 0,
      data: null,
      errorMessage: null,
    });
    console.log(config);
    return await axios(config)
      .then((response) => {
        console.log(response);
        try {
          if (response === null) throw new Error("API Error");
          console.log(response);
          return response;
        } catch (error) {
          console.log(error);
        }
      })
      .then((data) => {
        setPaletteGradientResponse({
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
        setPaletteGradientResponse({
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
        <h2 className="text-center text-3xl mt-10 mb-10">Palette Details</h2>
        <span className="material-symbols-outlined invisible">arrow_back</span>
      </div>
      {getPaletteByIdResponse.apiStatus === 0 && <Loader height={"300px"} />}
      {getPaletteByIdResponse.apiStatus === 1 && (
        <div className="mb-5">
          <div
            className="w-[100%] h-[200px] bg-teal-100 rounded-lg overflow-hidden pallete-tile shadow"
            // onClick={(e) => handleOnClick(e, color)}
          >
            <div
              className="w-[100%] h-[75px] bg-teal-500 relative pallete-color"
              style={{
                backgroundColor:
                  getPaletteByIdResponse?.data[0].palette[0].toUpperCase(),
              }}
            >
              <PalleteColorCopy
                color={getPaletteByIdResponse?.data[0].palette[0].toUpperCase()}
              />
            </div>
            <div
              className="w-[100%] h-[55px] bg-teal-300 relative pallete-color"
              style={{
                backgroundColor:
                  getPaletteByIdResponse?.data[0].palette[1].toUpperCase(),
              }}
            >
              <PalleteColorCopy
                color={getPaletteByIdResponse?.data[0].palette[1].toUpperCase()}
              />
            </div>
            <div
              className="w-[100%] h-[40px] bg-teal-200 relative pallete-color"
              style={{
                backgroundColor:
                  getPaletteByIdResponse?.data[0].palette[2].toUpperCase(),
              }}
            >
              <PalleteColorCopy
                color={getPaletteByIdResponse?.data[0].palette[2].toUpperCase()}
              />
            </div>
            <div
              className="w-[100%] h-[30px] bg-teal-100 relative pallete-color"
              style={{
                backgroundColor:
                  getPaletteByIdResponse?.data[0].palette[3].toUpperCase(),
              }}
            >
              <PalleteColorCopy
                color={getPaletteByIdResponse?.data[0].palette[3].toUpperCase()}
              />
            </div>
          </div>
          <div>
            <h2 className="text-left text-3xl mt-5 mb-5">Details</h2>
            <div className="grid grid-cols-3 gap-7">
              <p className="p-2 border-[1px] border-[#aaaaaa] border-opacity-75">
                <span className=""> Color One:</span>
                <span className="pl-2 font-semibold tracking-wider">
                  {getPaletteByIdResponse?.data[0].palette[0].toUpperCase()}
                </span>
              </p>
              <p className="p-2 border-[1px] border-[#aaaaaa] border-opacity-75">
                <span className=""> Color Two:</span>
                <span className="pl-2 font-semibold tracking-wider">
                  {getPaletteByIdResponse?.data[0].palette[1].toUpperCase()}
                </span>
              </p>
              <p className="p-2 border-[1px] border-[#aaaaaa] border-opacity-75">
                <span className=""> Color One:</span>
                <span className="pl-2 font-semibold tracking-wider">
                  {getPaletteByIdResponse?.data[0].palette[2].toUpperCase()}
                </span>
              </p>
              <p className="p-2 border-[1px] border-[#aaaaaa] border-opacity-75">
                <span className=""> Color Two:</span>
                <span className="pl-2 font-semibold tracking-wider">
                  {getPaletteByIdResponse?.data[0].palette[3].toUpperCase()}
                </span>
              </p>
              {getPaletteByIdResponse.data[0].userId.name && (
                <p className="p-2 border-[1px] border-[#aaaaaa] border-opacity-75">
                  <span className=""> User:</span>
                  <span className="pl-2 font-semibold tracking-wider">
                    {getPaletteByIdResponse.data[0].userId.name}
                  </span>
                </p>
              )}
              {getPaletteByIdResponse.data[0].userId.name && (
                <p className="p-2 border-[1px] border-[#aaaaaa] border-opacity-75">
                  <span className=""> User:</span>
                  <span className="pl-2 font-semibold tracking-wider">
                    <ReactTimeAgo
                      date={getPaletteByIdResponse.data[0].createdAt}
                      locale="en-US"
                    />
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {getPaletteByIdResponse.apiStatus === 1 &&
        ApiColorsCtx?.getUser()?.email ===
          getPaletteByIdResponse.data[0].userId.email && (
          <div className="my-8">
            <Link
              to={`/editPalette/${getPaletteByIdResponse.data[0]._id}`}
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
                  getPaletteByIdResponse.data[0]._id,
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

export default PaletteDetails;
