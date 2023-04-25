// const protocol = window.location.protocol;
// const host = window.location.host;
const protocol = "http:";
const host = "//localhost:8000";
const origin = "http://localhost:8000";

const DEV_API = {
  getAllGradients: {
    method: "get",
    url: `${origin}` + "/api/v1/gradient",
    Headers: {
      "Content-Type": "application/json",
    },
  },
  getAllPalette: {
    method: "get",
    url: `${origin}` + "/api/v1/palette",
    Headers: {
      "Content-Type": "application/json",
    },
  },
};

export default DEV_API;
