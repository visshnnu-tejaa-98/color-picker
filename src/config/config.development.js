const protocol = "http:";
const host = "//localhost:8000";
// const origin = "http://localhost:8000";
const origin = "https://color-picker-server-production.up.railway.app";

const DEV_API = {
  getAllTwoToneGradients: {
    url: `${origin}` + `/api/v1/gradient`,
  },
  getAllGradients: {
    method: "get",
    url: `${origin}` + `/api/v1/gradient`,
    headers: {
      "Content-Type": "application/json",
    },
  },
  getAllGradientsByUser: {
    method: "get",
    url: `${origin}` + "/api/v1/gradient/byuser",
    headers: {
      "Content-Type": "application/json",
    },
  },
  getPaletteByUser: {
    method: "get",
    url: `${origin}` + "/api/v1/palette/byuser",
    headers: {
      "Content-Type": "application/json",
    },
  },
  getGradientById: {
    method: "post",
    url: `${origin}` + "/api/v1/gradient/details",
    headers: {
      "Content-Type": "application/json",
    },
  },
  getPaletteById: {
    method: "post",
    url: `${origin}` + "/api/v1/palette/details",
    headers: {
      "Content-Type": "application/json",
    },
  },
  getAllPalette: {
    method: "get",
    url: `${origin}` + "/api/v1/palette",
    headers: {
      "Content-Type": "application/json",
    },
  },
  signUp: {
    method: "post",
    url: `${origin}` + "/api/v1/auth/signup",
    headers: {
      "Content-Type": "application/json",
    },
  },
  signOut: {
    method: "post",
    url: `${origin}` + "/api/v1/auth/logout",
    headers: {
      "Content-Type": "application/json",
    },
  },
  signIn: {
    method: "post",
    url: `${origin}` + "/api/v1/auth/login",
    headers: {
      "Content-Type": "application/json",
    },
  },
  addGradient: {
    method: "post",
    url: `${origin}` + "/api/v1/gradient/addGradient",
    headers: {
      "Content-Type": "application/json",
    },
  },
  editGradient: {
    method: "put",
    url: `${origin}` + "/api/v1/gradient/updateGradient",
    headers: {
      "Content-Type": "application/json",
    },
  },
  deleteGradient: {
    method: "delete",
    url: `${origin}` + "/api/v1/gradient/deleteGradient",
    headers: {
      "Content-Type": "application/json",
    },
  },
  addPalette: {
    method: "post",
    url: `${origin}` + "/api/v1/palette/addPalette",
    headers: {
      "Content-Type": "application/json",
    },
  },
  editPalette: {
    method: "put",
    url: `${origin}` + "/api/v1/palette/updatePalette",
    headers: {
      "Content-Type": "application/json",
    },
  },
  deletePalette: {
    method: "delete",
    url: `${origin}` + "/api/v1/palette/deletePalette",
    headers: {
      "Content-Type": "application/json",
    },
  },
};

export default DEV_API;
