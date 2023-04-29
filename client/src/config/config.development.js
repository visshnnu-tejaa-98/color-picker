// const protocol = window.location.protocol;
// const host = window.location.host;
const protocol = "http:";
const host = "//localhost:8000";
const origin = "http://localhost:8000";

const DEV_API = {
  getAllGradients: {
    method: "get",
    url: `${origin}` + "/api/v1/gradient",
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
    url: `${origin}` + "/api/v1/auth/login",
    headers: {
      "Content-Type": "application/json",
    },
  },
};

export default DEV_API;
