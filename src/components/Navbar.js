import { Footer } from "flowbite-react";
import React from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const location = useLocation();
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
              data-collapse-toggle="navbar-default"
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
                    to="/palette"
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
                    id="dropdownNavbarLink"
                    data-dropdown-toggle="dropdownNavbar"
                    class="flex py-2 pl-3 pr-4 text-[#CCCCCC] hover:text-[#1c1c1c] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#dddddd] md:p-0 my-1"
                  >
                    Gradient
                    <svg
                      class="w-5 h-5 ml-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>

                  <div
                    id="dropdownNavbar"
                    class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <ul
                      class="py-2 text-sm text-gray-700 dark:text-gray-400"
                      aria-labelledby="dropdownLargeButton"
                    >
                      <li>
                        <Link
                          to="/gradient"
                          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Two Tone Gradient
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/gradient/threetone"
                          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Three Tone Gradient
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="flex" style={{ height: "calc(100vh - 5rem)" }}>
        <div className=" w-[20%] h-[100%] bg-red-300 hidden md:block">
          <div class="h-full px-3 py-4 overflow-y-auto bg-[#310f41]">
            <ul class="space-y-2 font-medium">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center p-2 text-[#cccccc] rounded-lg hover:bg-[#8425af] hover:text-[#ffffff] text-[#FDE68A] font-semibold"
                      : "flex items-center p-2 text-[#cccccc] rounded-lg hover:bg-[#8425af] hover:text-[#ffffff]"
                  }
                >
                  <span class="material-symbols-outlined">home</span>
                  <span class="ml-3">Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/solid"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center p-2 text-[#cccccc] rounded-lg hover:bg-[#8425af] hover:text-[#ffffff] text-[#FDE68A] font-semibold"
                      : "flex items-center p-2 text-[#cccccc] rounded-lg hover:bg-[#8425af] hover:text-[#ffffff]"
                  }
                >
                  <span class="material-symbols-outlined">colorize</span>
                  <span class="ml-3">Solid Colors</span>
                </NavLink>
              </li>
              <li>
                <button
                  type="button"
                  class="flex items-center w-full p-2 text-[#cccccc] transition duration-75 rounded-lg group hover:bg-[#8425af] hover:text-[#ffffff]"
                  aria-controls="dropdown-example"
                  data-collapse-toggle="dropdown-example"
                >
                  <span class="material-symbols-outlined">invert_colors</span>
                  <span
                    class="flex-1 ml-3 text-left whitespace-nowrap"
                    sidebar-toggle-item
                  >
                    Gradient
                  </span>
                  <svg
                    sidebar-toggle-item
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <ul id="dropdown-example" class="hidden py-2 space-y-2">
                  <li>
                    <NavLink
                      to="/gradient"
                      className={() =>
                        location.pathname === "/gradient"
                          ? "flex items-center w-full p-2 text-[#cccccc] transition duration-75 rounded-lg pl-11 group hover:bg-[#8425af] hover:text-[#ffffff] text-[#FDE68A] font-semibold"
                          : "flex items-center w-full p-2 text-[#cccccc] transition duration-75 rounded-lg pl-11 group hover:bg-[#8425af] hover:text-[#ffffff]"
                      }
                    >
                      Two Tone Colors
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/gradient/threetone"
                      className={() => {
                        return location.pathname === "/gradient/threetone"
                          ? "flex items-center w-full p-2 text-[#cccccc] transition duration-75 rounded-lg pl-11 group hover:bg-[#8425af] hover:text-[#ffffff] text-[#FDE68A] font-semibold"
                          : "flex items-center w-full p-2 text-[#cccccc] transition duration-75 rounded-lg pl-11 group hover:bg-[#8425af] hover:text-[#ffffff]";
                      }}
                    >
                      Three Tone Colors
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink
                  to="/palette"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center p-2 text-[#cccccc] rounded-lg hover:bg-[#8425af] hover:text-[#ffffff] text-[#FDE68A] font-semibold"
                      : "flex items-center p-2 text-[#cccccc] rounded-lg hover:bg-[#8425af] hover:text-[#ffffff]"
                  }
                >
                  <span class="material-symbols-outlined">palette</span>
                  <span class="flex-1 ml-3 whitespace-nowrap">
                    Color Palette
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`text-white-100 md:w-[80%] h-[100%] w-[100%] overflow-auto hide-scroll`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
