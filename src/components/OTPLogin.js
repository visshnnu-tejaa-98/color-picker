import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DEV_API from "../config/config.development";

const OTPLogin = () => {
  const [email, setEmail] = useState("");
  const [sendWarningMessage, setsendWarningMessage] = useState(null);
  const [sendOTPResponse, setSendOTPResponse] = useState({
    apiStatus: 0,
    data: null,
    error: null,
  });

  const navigate = useNavigate();

  const handleSendOtp = async (email) => {
    setsendWarningMessage(null);
    localStorage.setItem("resend-email-otp", email);
    const url = DEV_API.sendOTP.url;
    const options = {
      ...DEV_API.sendOTP,
      body: JSON.stringify({ email }),
    };
    setSendOTPResponse({ apiStatus: 0, data: null, error: null });
    try {
      const req = await fetch(url, options);
      const res = await req.json();
      if (!res.success) {
        setsendWarningMessage(res.message);
      } else {
        navigate("/otpsubmit");
      }
      setSendOTPResponse({ apiStatus: 1, data: res, error: null });
    } catch (error) {
      console.log(error);
      setSendOTPResponse({ apiStatus: -1, data: null, error: error.message });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-10">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-[#cccccc] sm:text-4xl">
            Login Through OTP
          </h2>
          <p className="mt-2 text-base text-gray-400 400 mb-2">
            Don't have an account?
            <Link
              to="/signup"
              title=""
              className="font-medium pl-2 text-[#FCD34D] transition-all duration-200 hover:underline focus:text-[#FCD34D]"
            >
              Sign Up
            </Link>
          </p>
          {sendWarningMessage && (
            <div
              className={`p-1 text-sm text-red-800 rounded-lg bg-yellow-100 dark:bg-gray-800 dark:text-red-400 text-center`}
              role="alert"
            >
              {/* <span className="font-semibold pr-2">Warning!</span> */}
              {sendWarningMessage}
            </div>
          )}
          <form autoComplete="off" className="mt-2">
            <div className="space-y-4">
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
              <div className="flex justify-between">
                <p className="mt-2 text-base text-gray-400 400 mb-2 text-sm">
                  <Link
                    to="/signin"
                    title=""
                    className="font-medium text-[#FCD34D] transition-all duration-200 hover:underline focus:text-[#FCD34D]"
                  >
                    Login Through Password?
                  </Link>
                </p>
              </div>
              <div>
                <button
                  type="button"
                  className={`inline-flex w-full items-center justify-center rounded-md bg-[#8425af] px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-[#722097] ${
                    !email &&
                    "bg-[#E879F9] hover:bg-[#E879F9] cursor-not-allowed"
                  }`}
                  disabled={!email}
                  onClick={() => handleSendOtp(email)}
                >
                  Send Email
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

export default OTPLogin;
