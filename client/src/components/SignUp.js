import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-10">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-[#cccccc] sm:text-4xl">
            Sign Up
          </h2>
          <p className="mt-2 text-base text-gray-400">
            Already have an account?
            <Link
              to="/signin"
              title=""
              className="font-medium pl-2 text-[#FCD34D] transition-all duration-200 hover:underline focus:text-[#FCD34D]"
            >
              Sign In
            </Link>
          </p>
          <form action="#" autoComplete="off" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-200"
                >
                  Nick Name
                </label>
                <div className="mt-2.5">
                  <input
                    className="flex h-10 w-full rounded-md border border-[#cccccc] bg-transparent py-2 px-3 text-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#cccccc] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-[#cccccc] font-semibold tracking-wide"
                    type="text"
                    placeholder="Enter You Nick Name"
                    id="name"
                    autoComplete="false"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-200"
                >
                  Email address
                </label>
                <div className="mt-2.5">
                  <input
                    className="flex h-10 w-full rounded-md border border-[#cccccc] bg-transparent py-2 px-3 text-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#cccccc] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-[#cccccc] font-semibold tracking-wide"
                    type="email"
                    placeholder="Enter Your Email"
                    id="email"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-200"
                  >
                    Password
                  </label>
                  <div className="mt-2.5">
                    <input
                      className="flex h-10 w-full rounded-md border border-[#cccccc] bg-transparent py-2 px-3 text-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#cccccc] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-[#cccccc] font-semibold tracking-wide"
                      type="password"
                      placeholder="Enter Password"
                      id="password"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-200"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-2.5">
                    <input
                      className="flex h-10 w-full rounded-md border border-[#cccccc] bg-transparent py-2 px-3 text-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#cccccc] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-[#cccccc] font-semibold tracking-wide"
                      type="password"
                      placeholder="Confirm Password"
                      id="password"
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-[#8425af] px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-[#722097]"
                >
                  Sign Up
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="ml-2 h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3 space-y-3">
            <p>
              <span className="text-sm text-gray-400">
                Read our
                <span className="capitalize text-[#FCD34D] px-2">
                  privacy policy
                </span>
                and
                <span className="capitalize text-[#FCD34D] px-2">
                  terms of service
                </span>
                to learn more
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
