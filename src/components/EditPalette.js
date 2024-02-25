import React, { useContext, useEffect, useState } from "react";
import PalleteColorCopy from "./PalleteColorCopy";
import ApiColorsContext from "../contexts/apiColorsContext";
import { useLocation, useNavigate } from "react-router-dom";
import DEV_API from "../config/config.development";
import axios from "axios";
import Loader from "./Loader";

const EditPalette = () => {
  const [colors, setColors] = useState({
    color1: null,
    color2: null,
    color3: null,
    color4: null,
  });
  const [getPaletteByIdResponse, setPaletteByIdResponse] = useState({
    apiStatus: 0,
    data: null,
    errorMessage: null,
  });
  const [editPaletteResponse, setEditPaletteResponse] = useState({
    apiStatus: 0,
    data: null,
    errorMessage: null,
  });
  const ApiColorsCtx = useContext(ApiColorsContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location?.pathname?.split("/")[2]);
    getPaletteById(location?.pathname?.split("/")[2]); //true indicates to populate user details also
  }, []);

  const getPaletteById = async (id) => {
    let data = { id };
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
        console.log(data[0].palette[0]);
        setColors({
          ...colors,
          color1: data[0].palette[0],
          color2: data[0].palette[1],
          color3: data[0].palette[2],
          color4: data[0].palette[3],
        });
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
  const handleEditPalette = (id, email) => {
    console.log(id, email);
    editPalette(location?.pathname?.split("/")[2], email);
  };

  const editPalette = async (id, email) => {
    let data = {
      colors: `${colors.color1};${colors.color2};${colors.color3};${colors.color4}`,
    };
    let api = DEV_API.editPalette;
    let headers = { Authorization: `Bearer ${ApiColorsCtx.getAuthToken()}` };
    let config = {
      ...api,
      url: api.url + "/" + id,
      data,
      headers,
    };
    setEditPaletteResponse({
      apiStatus: 0,
      data: null,
      errorMessage: null,
    });
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
        setEditPaletteResponse({
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
        setEditPaletteResponse({
          apiStatus: -1,
          data: null,
          errorMessage: error?.response?.data?.message || error?.message,
        });
      });
  };

  return (
    <div className="text-[#cccccc] px-[7%] mb-10">
      <div className="flex justify-between items-center">
        <span
          className="material-symbols-outlined cursor-pointer hover:text-[#FCD34D]"
          title="Back"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
        <h2 className="text-center text-3xl mt-10 mb-10">Edit Palette</h2>
        <span className="material-symbols-outlined invisible">arrow_back</span>
      </div>
      {getPaletteByIdResponse.apiStatus === 0 && <Loader height={"300px"} />}
      {getPaletteByIdResponse.apiStatus === 1 && (
        <div>
          <div className="flex flex-col items-center gap-5 md:flex md:justify-between md:flex-row md:w-[100%]">
            <div className="flex justify-center md:w-[50%]">
              <table>
                <tbody>
                  <tr>
                    <th className="w-[100px] text-left h-[50px]">Color One</th>
                    <td>
                      <div className="text-lg">
                        <input
                          type="color"
                          name="color1"
                          value={colors.color1}
                          onChange={(e) =>
                            setColors({ ...colors, color1: e.target.value })
                          }
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
                          value={colors.color2}
                          onChange={(e) =>
                            setColors({ ...colors, color2: e.target.value })
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="w-[100px] text-left h-[50px]">
                      Color Three
                    </th>
                    <td>
                      <div className="text-lg">
                        <input
                          type="color"
                          name="color3"
                          value={colors.color3}
                          onChange={(e) =>
                            setColors({ ...colors, color3: e.target.value })
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="w-[100px] text-left h-[50px]">Color Four</th>
                    <td>
                      <div className="text-lg">
                        <input
                          type="color"
                          name="color4"
                          value={colors.color4}
                          onChange={(e) =>
                            setColors({ ...colors, color4: e.target.value })
                          }
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-center md:w-[50%]">
              <div className="w-[200px]">
                <div className="w-[100%] h-[200px] bg-teal-100 rounded-lg overflow-hidden pallete-tile shadow">
                  <div
                    style={{ backgroundColor: colors.color1 }}
                    className="w-[100%] h-[75px] bg-teal-500 relative pallete-color"
                  >
                    <PalleteColorCopy color={colors.color1} />
                  </div>
                  <div
                    style={{ backgroundColor: colors.color2 }}
                    className="w-[100%] h-[55px] bg-teal-300 relative pallete-color"
                  >
                    <PalleteColorCopy color={colors.color2} />
                  </div>
                  <div
                    style={{ backgroundColor: colors.color3 }}
                    className="w-[100%] h-[40px] bg-teal-200 relative pallete-color"
                  >
                    <PalleteColorCopy color={colors.color3} />
                  </div>
                  <div
                    style={{ backgroundColor: colors.color4 }}
                    className="w-[100%] h-[30px] bg-teal-100 relative pallete-color"
                  >
                    <PalleteColorCopy color={colors.color4} />
                  </div>
                </div>
              </div>
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
                handleEditPalette(
                  location?.pathname?.split("/")[2],
                  ApiColorsCtx?.getUser()?.email
                )
              }
            >
              Update Palette
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPalette;
