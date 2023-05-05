import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SolidColorsPage from "./components/SolidColorsPage";
import GradientColorsPage from "./components/GradientColorsPage";
import PalettePage from "./components/PalettePage";
import { element } from "prop-types";
import GradientTwoTone from "./components/GradientTwoTone";
import GradientThreeTone from "./components/GradientThreeTone";
import Home from "./components/Home.js";
import GenerateGradient from "./components/GenerateGradient";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import UserGradients from "./components/UserGradients";
import GradientDetails from "./components/GradientDetails";
import GeneratePalette from "./components/GeneratePalette";
import UserPalette from "./components/UserPalette";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/gradients",
        element: <UserGradients />,
      },
      {
        path: "/dashboard/palette",
        element: <UserPalette />,
      },
      {
        path: "/solid",
        element: <SolidColorsPage />,
      },
      {
        path: "/gradient",
        element: <GradientColorsPage />,
      },
      {
        path: "/generateGradient",
        element: <GenerateGradient />,
      },
      {
        path: "/generatePalette",
        element: <GeneratePalette />,
      },
      // {
      //   path: "/generateGradient",
      //   element: <GradientColorsPage />,
      //   children: [
      //     {
      //       path: "",
      //       element: <GradientTwoTone />,
      //       msg: "twotone",
      //     },
      //     {
      //       path: "threetone",
      //       element: <GradientThreeTone />,
      //       msg: "threetone",
      //     },
      //     {
      //       path: "generate",
      //       element: <GenerateGradient />,
      //     },
      //   ],
      // },
      {
        path: "/gradient/gradientDetails/:id",
        element: <GradientDetails />,
      },
      {
        path: "/palette",
        element: <PalettePage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
