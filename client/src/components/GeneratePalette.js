import React, { useContext, useState } from "react";
import ApiColorsContext from "../contexts/apiColorsContext";
import PalleteColorCopy from "./PalleteColorCopy";
import DEV_API from "../config/config.development";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GeneratePalette = () => {
  const [colors, setColors] = useState({
    color1: "#777777",
    color2: "#999999",
    color3: "#bbbbbb",
    color4: "#dddddd",
  });
  const [addPaletteResponse, setAddPaletteResponse] = useState({
    apiStatus: 0,
    data: null,
    errorMessage: null,
  });
  const ApiColorsCtx = useContext(ApiColorsContext);
  const navigate = useNavigate();

  const handleAddPalette = (colors) => {
    addPalette(colors);
  };

  const addPalette = async (colors) => {
    let data = {
      userId: ApiColorsCtx?.getUser()?._id,
      colors: `${colors.color1};${colors.color2};${colors.color3};${colors.color4}`,
    };
    let api = DEV_API.addPalette;
    let headers = { Authorization: `Bearer ${ApiColorsCtx.getAuthToken()}` };
    let config = {
      ...api,
      data,
      headers,
    };
    console.log(config);
    setAddPaletteResponse({
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
        setAddPaletteResponse({
          apiStatus: 1,
          data: data,
          errorMessage: null,
        });
        return data;
      })
      .then((data) => {
        navigate("/palette");
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
        setAddPaletteResponse({
          apiStatus: -1,
          data: null,
          errorMessage: error?.response?.data?.message || error?.message,
        });
      });
  };
  return (
    <div className="text-[#cccccc] px-[7%] mb-10">
      <h1 className="text-center text-7xl my-10">Create Palette</h1>
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
                <th className="w-[100px] text-left h-[50px]">Color Three</th>
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
          onClick={() => handleAddPalette(colors)}
        >
          Generate Palette
        </button>
      </div>
    </div>
  );
};

export default GeneratePalette;
