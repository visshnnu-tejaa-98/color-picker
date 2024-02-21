import { createContext, useState } from "react";
import DEV_API from "../config/config.development";
import axios from "axios";

const ApiColorsContext = createContext({
  twoToneColors: null,
  threeToneColors: null,
  gradientsByUser: null,
  paletteByUser: null,
  palette: null,
  authToken: null,
  loggedInUser: null,
  gradientById: null,
  getAllGradients: () => {},
  getAllGradientsByUser: () => {},
  getPaletteByUser: () => {},
  getAllPalette: () => {},
  userSignUp: () => {},
  updateAuthToken: () => {},
  getAuthToken: () => {},
  removeAuthToken: () => {},
  updateUser: () => {},
  getUser: () => {},
  removeUser: () => {},
});

export const ApiColorsContextProvider = (props) => {
  const [gradientResponse, setGradientResponse] = useState({
    apiStatus: 0,
    data: null,
    errorMessage: null,
  });
  const [getAllGradientsByUserResponse, setGetAllGradientsByUserResponse] =
    useState({
      apiStatus: 0,
      data: null,
      errorMessage: null,
    });
  const [gradientsByUser, setGradientsByUser] = useState(null);
  const [twoToneColors, setTwoToneColors] = useState(null);
  const [threeToneColors, setThreeToneColors] = useState(null);
  const [paletteResponse, setPaletteResponse] = useState({
    apiStatus: 0,
    data: null,
    errorMessage: null,
  });
  const [palette, setpalette] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  const [gradientById, setGradientById] = useState(null);
  const [paletteByUser, setPaletteByUser] = useState(null);
  const [getAllPaletteByUserResponse, SetGetAllPaletteByUserResponse] =
    useState({
      apiStatus: 0,
      data: null,
      errorMessage: null,
    });

  const getGradients = (pageNumber) => {
    let queryParams = { page: pageNumber };
    let data = {};
    const url = DEV_API.getAllGradients.url + `?page=${pageNumber}`;
    let api = { ...DEV_API.getAllGradients, url: url };
    let config = {
      ...api,
      data,
      queryParams,
    };
    setGradientResponse({
      apiStatus: 0,
      data: null,
      errorMessage: null,
    });
    // console.log(config);
    return axios(config)
      .then((response) => {
        try {
          if (response === null) throw new Error("API Error");
          // console.log(response);
          return response?.data;
        } catch (error) {
          console.log(error);
        }
      })
      .then((data) => {
        // console.log(data);
        // let twoTone = [];
        // let threeTone = [];
        // for (let i = 0; i < data.length; i++) {
        //   if (data[i].colors.length === 2) {
        //     twoTone.push(data[i]);
        //   } else if (data[i].colors.length === 3) {
        //     threeTone.push(data[i]);
        //   }
        // }
        // console.log({ twoTone, threeTone });
        setTwoToneColors(data);
        // setThreeToneColors(threeTone);
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
  const getAllGradientsByUser = async () => {
    let queryParams = {};
    let data = {};
    let headers = { Authorization: `Bearer ${getAuthToken()}` };
    let api = DEV_API.getAllGradientsByUser;
    let config = {
      ...api,
      data,
      queryParams,
      headers,
    };
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
        for (let i = 0; i < data.length; i++) {
          if (data[i].colors.length === 2) {
            twoTone.push(data[i]);
          }
        }
        setGradientsByUser(twoTone);
        return setGetAllGradientsByUserResponse({
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
        setGetAllGradientsByUserResponse({
          apiStatus: -1,
          data: null,
          errorMessage: error.message,
        });
      });
  };
  const getPaletteByUser = async () => {
    let queryParams = {};
    let data = {};
    let headers = { Authorization: `Bearer ${getAuthToken()}` };
    let api = DEV_API.getPaletteByUser;
    let config = {
      ...api,
      data,
      queryParams,
      headers,
    };
    SetGetAllPaletteByUserResponse({
      apiStatus: 0,
      data: null,
      errorMessage: null,
    });
    return axios(config)
      .then((response) => {
        try {
          if (response === null) throw new Error("API Error");
          // console.log(response);
          return response?.data?.palette;
        } catch (error) {
          console.log(error);
        }
      })
      .then((data) => {
        setPaletteByUser(data);
        return SetGetAllPaletteByUserResponse({
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
        SetGetAllPaletteByUserResponse({
          apiStatus: -1,
          data: null,
          errorMessage: error.message,
        });
      });
  };

  const getPalette = async () => {
    let queryParams = {};
    let data = {};
    let api = DEV_API.getAllPalette;
    let config = {
      ...api,
      data,
      queryParams,
    };
    // if (paletteResponse.apiStatus !== 0) {
    //   console.log("Simply return");
    //   return;
    // }
    setPaletteResponse({
      apiStatus: 0,
      data: null,
      errorMessage: null,
    });
    return axios(config)
      .then((response) => {
        try {
          if (response === null) throw new Error("API Error");
          console.log(response);
          return response?.data?.palette;
        } catch (error) {
          console.log(error);
        }
      })
      .then((data) => {
        let paletteArray = [];
        data.map((p) => paletteArray.push(p));
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
    console.log("TOKEN:::", token);
    localStorage.setItem("colorPicker", token);
    setAuthToken(token);
  };

  const getAuthToken = () => {
    let token = authToken || localStorage.getItem("colorPicker");
    if (token) {
      return token;
    } else {
      return "undefined";
    }
  };

  const removeAuthToken = () => {
    localStorage.removeItem("colorPicker");
  };

  const updateUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const getUser = () => {
    let loggedInUser = user || JSON.parse(localStorage.getItem("user"));
    return loggedInUser;
  };

  const removeUser = () => {
    localStorage.removeItem("user");
  };

  return (
    <ApiColorsContext.Provider
      value={{
        gradientResponse: gradientResponse,
        twoToneColors: twoToneColors,
        threeToneColors: threeToneColors,
        getAllGradientsByUserResponse: getAllGradientsByUserResponse,
        gradientsByUser: gradientsByUser,
        paletteByUser: paletteByUser,
        palette: palette,
        authToken: authToken,
        getAllGradients: getGradients,
        getAllGradientsByUser: getAllGradientsByUser,
        getPaletteByUser: getPaletteByUser,
        getAllPalette: getPalette,
        updateAuthToken: updateAuthToken,
        getAuthToken: getAuthToken,
        removeAuthToken: removeAuthToken,
        updateUser: updateUser,
        getUser: getUser,
        removeUser: removeUser,
      }}
    >
      {props.children}
    </ApiColorsContext.Provider>
  );
};

export default ApiColorsContext;
