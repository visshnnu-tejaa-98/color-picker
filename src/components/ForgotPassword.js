import React, { useState } from "react";
import { Link } from "react-router-dom";
import DEV_API from "../config/config.development";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPasswordResponse, setForgotPasswordResponse] = useState({
    apiStatus: 0,
    data: null,
    errorMessage: null,
  });

  const handleForgotPassword = async () => {
    // delete token from local storage
    localStorage.removeItem("");
    const url = DEV_API.forgotPassword.url;
    const options = {
      ...DEV_API.forgotPassword,
      url,
      body: JSON.stringify({ email }),
    };
    setForgotPasswordResponse({ apiStatus: 0, error: null, data: null });
    try {
      const req = await fetch(url, options);
      const res = await req.json();
      console.log(res);
      setForgotPasswordResponse({ apiStatus: 1, error: null, data: res });
    } catch (error) {
      console.log(error);
      setForgotPasswordResponse({
        apiStatus: -1,
        error: error.message,
        data: null,
      });
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-10">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-[#cccccc] sm:text-4xl">
            Forgot Password
          </h2>
          <p className="mt-2 text-base text-gray-400">
            Don't have an account?
            <Link
              to="/signup"
              title=""
              className="font-medium pl-2 text-[#FCD34D] transition-all duration-200 hover:underline focus:text-[#FCD34D]"
            >
              Sign Up
            </Link>
          </p>
          <div
            className={`p-1 mt-1 text-sm text-red-800 rounded-lg bg-yellow-100 dark:bg-gray-800 dark:text-red-400 text-center ${
              forgotPasswordResponse?.apiStatus === 0 && "invisible"
            }`}
            role="alert"
          >
            {/* <span className="font-semibold pr-2">Warning!</span> */}
            {forgotPasswordResponse?.data?.message}
          </div>
          <form action="#" autoComplete="off" method="POST" className="mt-2">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-200"
                >
                  Email address <span className="text-red-400">*</span>
                </label>
                <div className="mt-2.5">
                  <input
                    className="flex h-10 w-full rounded-md border border-[#cccccc] bg-transparent py-2 px-3 text-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#cccccc] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-[#cccccc] font-semibold tracking-wide"
                    type="email"
                    placeholder="Enter Your Email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-[#8425af] px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-[#722097]"
                  onClick={handleForgotPassword}
                >
                  Proceed
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
                to Know more
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
