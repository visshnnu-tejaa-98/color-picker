import { createContext, useState } from "react";
import DEV_API from "../config/config.development";
import axios from "axios";

const ApiColorsContext = createContext({
  twoToneColors: null,
  threeToneColors: null,
  getAllGradients: () => {},
});

export const ApiColorsContextProvider = (props) => {
  const [gradientResponse, setGradientResponse] = useState({
    apiStatus: 0,
    data: null,
    errorMessage: null,
  });

  const [twoToneColors, setTwoToneColors] = useState(null);
  const [threeToneColors, setThreeToneColors] = useState(null);

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
          console.log(response);
          return response?.data?.gradients;
        } catch (error) {
          console.log(error);
        }
      })
      .then((data) => {
        console.log(data);
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
  return (
    <ApiColorsContext.Provider
      value={{
        gradientResponse: gradientResponse,
        twoToneColors: twoToneColors,
        threeToneColors: threeToneColors,
        getAllGradients: getGradients,
      }}
    >
      {props.children}
    </ApiColorsContext.Provider>
  );
};

export default ApiColorsContext;
