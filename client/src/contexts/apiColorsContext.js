import { createContext, useState } from "react";
import DEV_API from "../config/config.development";
import axios from "axios";

const ApiColorsContext = createContext({
  twoToneColors: null,
  threeToneColors: null,
  palette: null,
  authToken: null,
  getAllGradients: () => {},
  getAllPalette: () => {},
  userSignUp: () => {},
  updateAuthToken: () => {},
  getAuthToken: () => {},
  removeAuthToken: () => {},
});

export const ApiColorsContextProvider = (props) => {
  const [gradientResponse, setGradientResponse] = useState({
    apiStatus: 0,
    data: null,
    errorMessage: null,
  });

  const [twoToneColors, setTwoToneColors] = useState(null);
  const [threeToneColors, setThreeToneColors] = useState(null);
  const [paletteResponse, setPaletteResponse] = useState({
    apiStatus: 0,
    data: null,
    errorMessage: null,
  });
  const [palette, setpalette] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  const getGradients = () => {
    let queryParams = {};
    let data = {};
    let api = DEV_API.getAllGradients;
    let config = {
      ...api,
      data,
      queryParams,
    };
    if (twoToneColors && threeToneColors) {
      return;
    }
    setGradientResponse({
      apiStatus: 0,
      data: null,
      errorMessage: null,
    });
    return axios(config)
      .then((response) => {
        try {
          if (response === null) throw new Error("API Error");
          // console.log(response);
          return response?.data?.gradients;
        } catch (error) {
          console.log(error);
        }
      })
      .then((data) => {
        let twoTone = [];
        let threeTone = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].colors.length === 2) {
            twoTone.push(data[i].colors);
          } else if (data[i].colors.length === 3) {
            threeTone.push(data[i].colors);
          }
        }
        setTwoToneColors(twoTone);
        setThreeToneColors(threeTone);
        return setGradientResponse({
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
        setGradientResponse({
          apiStatus: -1,
          data: null,
          errorMessage: error.message,
        });
      });
  };

  const getPalette = () => {
    let queryParams = {};
    let data = {};
    let api = DEV_API.getAllPalette;
    let config = {
      ...api,
      data,
      queryParams,
    };
    if (paletteResponse.apiStatus !== 0) {
      console.log("Simply return");
      return;
    }
    setPaletteResponse({
      apiStatus: 0,
      data: null,
      errorMessage: null,
    });
    return axios(config)
      .then((response) => {
        try {
          if (response === null) throw new Error("API Error");
          return response?.data?.palette;
        } catch (error) {
          console.log(error);
        }
      })
      .then((data) => {
        let paletteArray = [];
        data.map((p) => paletteArray.push(p.palette));
        setpalette(paletteArray);
        return setPaletteResponse({
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
        setPaletteResponse({
          apiStatus: -1,
          data: null,
          errorMessage: error.message,
        });
      });
  };

  const updateAuthToken = (token) => {
    localStorage.setItem("colorPicker", token);
    setAuthToken(token);
  };

  const getAuthToken = () => {
    let token = authToken || localStorage.getItem("colorPicker");
    return token;
  };

  const removeAuthToken = () => {
    localStorage.removeItem("colorPicker");
    localStorage.removeItem("user");
  };

  return (
    <ApiColorsContext.Provider
      value={{
        gradientResponse: gradientResponse,
        twoToneColors: twoToneColors,
        threeToneColors: threeToneColors,
        palette: palette,
        authToken: authToken,
        getAllGradients: getGradients,
        getAllPalette: getPalette,
        updateAuthToken: updateAuthToken,
        getAuthToken: getAuthToken,
        removeAuthToken: removeAuthToken,
      }}
    >
      {props.children}
    </ApiColorsContext.Provider>
  );
};

export default ApiColorsContext;
