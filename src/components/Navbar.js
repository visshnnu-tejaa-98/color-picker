import { Footer } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Logo from "../assets/logo.png";
import "flowbite";
import ApiColorsContext from "../contexts/apiColorsContext";
import axios from "axios";
import DEV_API, { feOrigin } from "../config/config.development";

const Navbar = () => {
  const location = useLocation();
  const [isAccordianOpenData, setIsAccordianOpenData] = useState({
    isGradientOpen: false,
    isCreateOpen: false,
  });
  const [isOpenTop, setIsOpenTop] = useState(false);
  const [isOpenSideNavbar, setIsOpenSideBar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signOutResponse, setSignOutResponse] = useState({
    apiStatus: 0,
    data: null,
    errorMessage: null,
  });
  const ApiColorsCtx = useContext(ApiColorsContext);
  const navigate = useNavigate();

  const { isGradientOpen, isCreateOpen } = isAccordianOpenData;

  useEffect(() => {
    let paths = ["/", "/signup", "/signin", "/forgotPassword"];
    if (paths.includes(window.location.pathname)) {
      setIsOpenSideBar(false);
    } else {
      setIsOpenSideBar(true);
    }
  }, [window.location.pathname]);

  useEffect(() => {
    if (
      ApiColorsCtx.getAuthToken() &&
      ApiColorsCtx.getAuthToken() !== "undefined"
    ) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [ApiColorsCtx.getAuthToken()]);

  const handleSignOut = () => {
    signOut();
  };

  const signOut = async (user) => {
    let data = user;
    let api = DEV_API.signOut;
    let headers = { Authorization: `Bearer ${ApiColorsCtx.getAuthToken()}` };
    let config = {
      ...api,
      data,
      headers,
    };
    setSignOutResponse({
      apiStatus: 0,
      data: null,
      errorMessage: null,
    });

    return await axios(config)
      .then((response) => {
        try {
          if (response === null) throw new Error("API Error");
          return response;
        } catch (error) {
          console.log(error);
        }
      })
      .then((data) => {
        setSignOutResponse({
          apiStatus: 1,
          data: data,
          errorMessage: null,
        });
        return data;
      })
      .then((data) => {
        ApiColorsCtx.removeAuthToken();
        ApiColorsCtx.removeUser();
        return;
      })
      .then((data) => {
        ApiColorsCtx.updateAuthToken(data?.data?.token);
        ApiColorsCtx.updateUser(data?.data?.user);
        navigate("/solid");
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
        setSignOutResponse({
          apiStatus: -1,
          data: null,
          errorMessage: error?.response?.data?.message || error?.message,
        });
      });
  };

  const makeActiveSideBar = (route, type) => {
    if (location.pathname.includes(route) && !isAccordianOpenData[type]) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <div className="text-[#CCCCCC] px-[7%] sticky top-0 bg-[#1E0927] z-10 shadow-[0_8px_6px_-6px_rgba(204,204,204,0.3)]   ">
        <nav className="bg-transparent border-gray-200 px-2 sm:px-4 py-2.5">
          <div className="container flex flex-wrap items-center justify-between mx-auto">
            <Link to="/" className="flex items-center">
              <img src={Logo} className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap">
                Color Picker
              </span>
            </Link>
            <button
              // data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-[#CCCCCC] rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div
              className="hidden w-full md:block md:w-auto bg-transperent"
              id="navbar-default"
            >
              <ul className="flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
                <li className={`${isLoggedIn && "hidden"}`}>
                  <NavLink
                    to="/signin"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 pl-3 pr-4 text-[#1c1c1c] rounded bg-[#CCCCCC] md:bg-transparent md:text-white md:p-0 my-1"
                        : "block py-2 pl-3 pr-4 text-[#CCCCCC] hover:text-[#1c1c1c] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#dddddd] md:p-0 my-1"
                    }
                  >
                    Sign In
                  </NavLink>
                </li>
                <li className={`${!isLoggedIn && "hidden"}`}>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 pl-3 pr-4 text-[#1c1c1c] rounded bg-[#CCCCCC] md:bg-transparent md:text-white md:p-0 my-1"
                        : "block py-2 pl-3 pr-4 text-[#CCCCCC] hover:text-[#1c1c1c] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#dddddd] md:p-0 my-1"
                    }
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/solid"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 pl-3 pr-4 text-[#1c1c1c] rounded bg-[#CCCCCC] md:bg-transparent md:text-white md:p-0 my-1"
                        : "block py-2 pl-3 pr-4 text-[#CCCCCC] hover:text-[#1c1c1c] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#dddddd] md:p-0 my-1"
                    }
                  >
                    Solid
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/palette?page=1"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 pl-3 pr-4 text-[#1c1c1c] rounded bg-[#CCCCCC] md:bg-transparent md:text-white md:p-0 my-1"
                        : "block py-2 pl-3 pr-4 text-[#CCCCCC] rounded hover:text-[#1c1c1c] hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#dddddd] md:p-0 my-1"
                    }
                  >
                    palette
                  </NavLink>
                </li>
                <li>
                  <button
                    // id="dropdownNavbarLink"
                    // data-dropdown-toggle="dropdownNavbar"
                    className="flex py-2 pl-3 pr-4 text-[#CCCCCC] hover:text-[#1c1c1c] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#dddddd] md:p-0 my-1"
                    onClick={() => setIsOpenTop((prev) => !prev)}
                  >
                    Gradient
                    <svg
                      className="w-5 h-5 ml-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  {isOpenTop && (
                    <div className="z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute">
                      <ul className="py-2 text-sm text-gray-700">
                        <li>
                          <Link
                            to="/gradient?page=1"
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setIsOpenTop(false)}
                          >
                            Two Tone Gradient
                          </Link>
                        </li>
                        {/* <li>
                          <Link
                            to="/gradient/threetone"
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setIsOpenTop(false)}
                          >
                            Three Tone Gradient
                          </Link>
                        </li> */}
                        <li>
                          <Link
                            to="/gradient/generate"
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setIsOpenTop(false)}
                          >
                            Generate Gradient
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}

                  <div className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                    {isOpenTop && (
                      <ul className="py-2 text-sm text-gray-700">
                        <li>
                          <Link
                            to="/gradient?page=1"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Two Tone Gradient
                          </Link>
                        </li>
                        {/* <li>
                          <Link
                            to="/gradient/threetone"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Three Tone Gradient
                          </Link>
                        </li> */}
                        <li>
                          <Link
                            to="/gradient/generate"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Generate Gradient
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="flex" style={{ height: "calc(100vh - 5rem)" }}>
        <div
          className={`w-[20%] h-[100%] bg-red-300 hidden md:block ${
            !isOpenSideNavbar && "md:hidden"
          }`}
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-[#310f41]">
            <ul className="space-y-2 font-medium">
              <li className={!isLoggedIn && "hidden"}>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center p-2 text-[#cccccc] rounded-lg hover:bg-[#8425af] hover:text-[#ffffff] active-sidebar font-semibold"
                      : "flex items-center p-2 text-[#cccccc] rounded-lg hover:bg-[#8425af] hover:text-[#ffffff]"
                  }
                >
                  <span className="material-symbols-outlined">dashboard</span>
                  <span className="ml-3">Dashboard</span>
                </NavLink>
              </li>
              <li className={isLoggedIn && "hidden"}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center p-2 text-[#cccccc] rounded-lg hover:bg-[#8425af] hover:text-[#ffffff] active-sidebar font-semibold"
                      : "flex items-center p-2 text-[#cccccc] rounded-lg hover:bg-[#8425af] hover:text-[#ffffff]"
                  }
                >
                  <span className="material-symbols-outlined">home</span>
                  <span className="ml-3">Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/solid"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center p-2 text-[#cccccc] rounded-lg hover:bg-[#8425af] hover:text-[#ffffff] active-sidebar font-semibold"
                      : "flex items-center p-2 text-[#cccccc] rounded-lg hover:bg-[#8425af] hover:text-[#ffffff]"
                  }
                >
                  <span className="material-symbols-outlined">colorize</span>
                  <span className="ml-3">Solid Colors</span>
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/gradient"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center p-2 text-[#cccccc] rounded-lg hover:bg-[#8425af] hover:text-[#ffffff] active-sidebar font-semibold"
                      : "flex items-center p-2 text-[#cccccc] rounded-lg hover:bg-[#8425af] hover:text-[#ffffff]"
                  }
                >
                  <span className="material-symbols-outlined">
                    invert_colors
                  </span>
                  <span className="ml-3">Gradient Colors</span>
                </NavLink>
              </li> */}
              <button
                type="button"
                className={`flex items-center w-full p-2 text-[#cccccc] transition duration-75 rounded-lg group hover:bg-[#8425af] hover:text-[#ffffff] ${
                  makeActiveSideBar(feOrigin + "/gradient", "isGradientOpen")
                    ? "active-sidebar font-semibold"
                    : ""
                }`}
                onClick={() =>
                  setIsAccordianOpenData((prev) => {
                    return {
                      ...prev,
                      isCreateOpen: false,
                      isGradientOpen: !isAccordianOpenData.isGradientOpen,
                    };
                  })
                }
              >
                <span className="material-symbols-outlined">invert_colors</span>{" "}
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Gradient Colors
                </span>
                <span>{isGradientOpen}</span>
                {isGradientOpen ? (
                  <span className="material-symbols-outlined transition duration-150 ease-in-out">
                    expand_more
                  </span>
                ) : (
                  <span className="material-symbols-outlined -rotate-90 transition duration-200 ease-in-out">
                    expand_more
                  </span>
                )}
              </button>
              {isGradientOpen && (
                <ul className="px-2">
                  <li>
                    <NavLink
                      to="/gradient?page=1"
                      className={() =>
                        location.pathname === "/gradient"
                          ? "flex items-center w-full p-2 text-[#cccccc] transition duration-75 rounded-lg pl-11 group hover:bg-[#8425af] hover:text-[#ffffff] active-sidebar font-semibold"
                          : "flex items-center w-full p-2 text-[#cccccc] transition duration-75 rounded-lg pl-11 group hover:bg-[#8425af] hover:text-[#ffffff]"
                      }
                    >
                      Two Tone Colors
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink
                      to="/gradient/threetone"
                      className={() => {
                        return location.pathname === "/gradient/threetone"
                          ? "flex items-center w-full p-2 text-[#cccccc] transition duration-75 rounded-lg pl-11 group hover:bg-[#8425af] hover:text-[#ffffff] active-sidebar font-semibold"
                          : "flex items-center w-full p-2 text-[#cccccc] transition duration-75 rounded-lg pl-11 group hover:bg-[#8425af] hover:text-[#ffffff]";
                      }}
                    >
                      Three Tone Colors
                    </NavLink>
                  </li> */}
                </ul>
              )}
              <li>
                <NavLink
                  to="/palette?page=1"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center p-2 text-[#cccccc] rounded-lg hover:bg-[#8425af] hover:text-[#ffffff] active-sidebar font-semibold"
                      : "flex items-center p-2 text-[#cccccc] rounded-lg hover:bg-[#8425af] hover:text-[#ffffff]"
                  }
                >
                  <span className="material-symbols-outlined">palette</span>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Color Palette
                  </span>
                </NavLink>
              </li>
              <button
                type="button"
                className={`flex items-center w-full p-2 text-[#cccccc] transition duration-75 rounded-lg group hover:bg-[#8425af] hover:text-[#ffffff] ${
                  makeActiveSideBar(feOrigin + "/gradient", "isCreateOpen")
                    ? "active-sidebar font-semibold"
                    : ""
                }`}
                onClick={() =>
                  setIsAccordianOpenData((prev) => {
                    return {
                      ...prev,
                      isGradientOpen: false,
                      isCreateOpen: !isAccordianOpenData.isCreateOpen,
                    };
                  })
                }
              >
                <span className="material-symbols-outlined">add_circle</span>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Create
                </span>
                <span>{isCreateOpen}</span>
                {isCreateOpen ? (
                  <span className="material-symbols-outlined transition duration-150 ease-in-out">
                    expand_more
                  </span>
                ) : (
                  <span className="material-symbols-outlined -rotate-90 transition duration-200 ease-in-out">
                    expand_more
                  </span>
                )}
              </button>
              {isCreateOpen && (
                <ul className="px-2">
                  <li>
                    <NavLink
                      to="generateGradient"
                      className={() => {
                        return location.pathname === "/generateGradient"
                          ? "flex items-center w-full p-2 text-[#cccccc] transition duration-75 rounded-lg pl-11 group hover:bg-[#8425af] hover:text-[#ffffff] active-sidebar font-semibold"
                          : "flex items-center w-full p-2 text-[#cccccc] transition duration-75 rounded-lg pl-11 group hover:bg-[#8425af] hover:text-[#ffffff]";
                      }}
                    >
                      Create Gradient
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="generatePalette"
                      className={() => {
                        return location.pathname === "/generatePalette"
                          ? "flex items-center w-full p-2 text-[#cccccc] transition duration-75 rounded-lg pl-11 group hover:bg-[#8425af] hover:text-[#ffffff] active-sidebar font-semibold"
                          : "flex items-center w-full p-2 text-[#cccccc] transition duration-75 rounded-lg pl-11 group hover:bg-[#8425af] hover:text-[#ffffff]";
                      }}
                    >
                      Create Palette
                    </NavLink>
                  </li>
                </ul>
              )}
            </ul>
          </div>
        </div>
        <div
          className={`text-white-100 h-[100%] w-[100%] overflow-auto hide-scroll ${
            !isOpenSideNavbar ? "md:w-[100%]" : "md:w-[80%]"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
