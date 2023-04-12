import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/banner-img.svg";

const Home = () => {
  return (
    <div className="px-[7%] text-[#cccccc]">
      <div className="w-[100%] block sm:flex">
        <div className="w-[100%] h-[250px] sm:w-[50%] sm:mt-10 flex justify-center text-center sm:text-left items-center sm:items-start flex-col sm:pl-2">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold ">
            Click to Copy
          </h1>
          <h3 className="py-4 opacity-80 text-2xl mb-3">
            Select always Perfect Color to Develop Applications...
          </h3>
          <Link to="/solid" className="w-[144px]">
            <span className="py-1.5 px-3 bg-[#7E22CE] text-xl font-semibold rounded hover:text-[#cccccc] border border-[#7E22CE] hover:bg-transparent hover:border-[#cccccc] hover:ease-in-out hover:duration-300">
              <span>Copy Color</span>
            </span>
          </Link>
        </div>
        <div className="w-[100%] h-[250px] sm:w-[50%] sm:mt-10 flex justify-center items-center">
          <img src={BannerImage} alt="main-img" className="w-[70%]" />
        </div>
      </div>
      {/* Features */}
      <div>
        <section className="py-10 sm:py-16 lg:pt-32 lg:pb-10">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="mt-6 text-3xl font-bold leading-tight text-[#cccccc] sm:text-4xl lg:text-5xl">
                Our Features
              </h2>
            </div>
            <div className="grid items-center grid-cols-1 mt-12 gap-y-10 lg:grid-cols-5 sm:mt-20 gap-x-4">
              <div className="space-y-8 lg:pr-16 xl:pr-24 lg:col-span-2 lg:space-y-12">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-12 h-12"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                    ></path>
                  </svg>
                  <div className="ml-5">
                    <h3 className="text-xl font-semibold text-[#cccccc]">
                      Solid Colors
                    </h3>
                    <p className="mt-3 text-base text-[#cccccc] opacity-75">
                      Click to Copy any desired color to get Always Perfect
                      Color
                      <Link to="/solid">
                        <span className="text-[#FEF5AC] underline underline-offset-2 pl-1">
                          click here
                        </span>
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-12 h-12"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                    ></path>
                  </svg>
                  <div className="ml-5">
                    <h3 className="text-xl font-semibold text-[#cccccc]">
                      Gradient Colors
                    </h3>
                    <p className="mt-3 text-base text-[#cccccc] opacity-75">
                      You can directly copy gradient colors, you can generate
                      your own gradient color
                      <Link to="/gradient">
                        <span className="text-[#FEF5AC] underline underline-offset-2 pl-1">
                          click here
                        </span>
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-12 h-12"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    ></path>
                  </svg>
                  <div className="ml-5">
                    <h3 className="text-xl font-semibold text-[#cccccc]">
                      Color Palette
                    </h3>
                    <p className="mt-3 text-base text-[#cccccc] opacity-75">
                      Select your palette among the best colors out there{" "}
                      <Link to="/palette">
                        <span className="text-[#FEF5AC] underline underline-offset-2 pl-1">
                          click here
                        </span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                <img
                  className="w-full rounded-lg shadow-xl"
                  src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGRlc2lnbnxlbnwwfHwwfHw%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* stay updated */}
      <section className="mb-32 text-gray-800 text-center pt-28 pb-10">
        <div className="flex flex-wrap justify-center">
          <div className="grow-0 shrink-0 flex-basis w-full lg:w-6/12 px-3">
            <div className="p-4 inline-block mb-6 w-15 h-15 rounded bg-[#7E22CE]">
              <span className="material-symbols-outlined text-[#cccccc] scale-150">
                mail
              </span>
            </div>
            <h2 className="text-3xl text-[#cccccc] font-semibold mb-6">
              Get Updated with Color Picker
            </h2>

            <p className="text-[#cccccc] opacity-75 mb-12">
              Get Updates when we modify something in UI Color Picker
            </p>

            <div className="md:flex flex-row">
              <input
                type="text"
                className="form-control block w-full px-4 py-2 mb-2 md:mb-0 md:mr-2 text-xl font-normal text-[#cccccc] bg-transparent bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-[#cccccc] focus:bg-transparent focus:border-[#7E22CE] focus:outline-none"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="inline-block px-7 py-3 bg-[#7E22CE] text-[#cccccc] text-lg font-semibold leading-snug rounded shadow-md hover:bg-[#7E22CE] hover:shadow-lg focus:bg-[#7E22CE] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#7E22CE] active:shadow-lg transition duration-150 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
