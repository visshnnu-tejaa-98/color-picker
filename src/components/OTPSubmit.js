import React, { useContext, useState } from "react";
import ApiColorsContext from "../contexts/apiColorsContext";
import { Link, useNavigate } from "react-router-dom";
import DEV_API from "../config/config.development";
import OTPInput from "react-otp-input";

const OTPSubmit = () => {
  const [otp, setOtp] = useState("");
  const [submitWarningMessage, setSubmitWarningMessage] = useState(null);
  const [submitOTPResponse, setSubmitOTPResponse] = useState({
    apiStatus: 0,
    data: null,
    error: null,
  });
  const [sendOTPResponse, setSendOTPResponse] = useState({
    apiStatus: 0,
    data: null,
    error: null,
  });
  const ApiColorsCtx = useContext(ApiColorsContext);
  const navigate = useNavigate();

  const handleSubmitOtp = async (otp) => {
    const email = localStorage.getItem("resend-email-otp");
    const url = DEV_API.submitOTP.url;
    const options = {
      ...DEV_API.sendOTP,
      body: JSON.stringify({ otp, email }),
    };
    setSubmitOTPResponse({ apiStatus: 0, data: null, error: null });
    try {
      const req = await fetch(url, options);
      const res = await req.json();
      if (!res.success) {
        setSubmitWarningMessage(res.message);
        setOtp("");
        return;
      }
      setSubmitOTPResponse({ apiStatus: 1, data: res, error: null });
      localStorage.removeItem("resend-email-otp");
      if (res.success === true) {
        ApiColorsCtx.updateAuthToken(res?.token);
        ApiColorsCtx.updateUser(res.user);
        navigate("/solid");
      }
    } catch (error) {
      console.log(error);
      setSubmitOTPResponse({ apiStatus: -1, data: null, error: error.message });
    }
  };

  const handleSendOtp = async () => {
    const email = localStorage.getItem("resend-email-otp");
    const url = DEV_API.sendOTP.url;
    const options = {
      ...DEV_API.sendOTP,
      body: JSON.stringify({ email }),
    };
    setSendOTPResponse({ apiStatus: 0, data: null, error: null });
    try {
      const req = await fetch(url, options);
      const res = await req.json();
      setSendOTPResponse({ apiStatus: 1, data: res, error: null });
      if (!res.success) {
        localStorage.removeItem("resend-email-otp");
      } else {
        setSubmitWarningMessage(res.message);
      }
    } catch (error) {
      console.log(error);
      setSendOTPResponse({ apiStatus: -1, data: null, error: error.message });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-10">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-[#cccccc] sm:text-4xl">
              Enter your OTP
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
            {submitWarningMessage && (
              <div
                className={`p-1 text-sm text-red-800 rounded-lg bg-yellow-100 dark:bg-gray-800 dark:text-red-400 text-center`}
                role="alert"
              >
                {/* <span className="font-semibold pr-2">Warning!</span> */}
                {submitWarningMessage}
              </div>
            )}
            <form autoComplete="off" className="mt-2">
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-200"
                >
                  Enter OTP <span className="text-red-400">*</span>
                </label>
                <div className="mt-2.5">
                  <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                    isInputNum={true}
                    shouldAutoFocus={true}
                    inputStyle={{
                      background: "#240B30",
                      border: "1px solid #CCCCCC",
                      borderRadius: "7px",
                      width: "3.4rem",
                      height: "3rem",
                      color: "#CCCCCC",
                    }}
                  />
                  <p className="mt-2 text-base text-gray-400 400 mb-2 text-sm">
                    Resend Otp?
                    <Link
                      to="#"
                      title=""
                      className="font-medium pl-1 text-[#FCD34D] transition-all duration-200 hover:underline focus:text-[#FCD34D]"
                      onClick={handleSendOtp}
                    >
                      Click Here
                    </Link>
                  </p>
                </div>
              </div>
              <button
                type="button"
                className={`inline-flex w-full items-center justify-center rounded-md bg-[#8425af] px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-[#722097] ${
                  !otp && "bg-[#E879F9] hover:bg-[#E879F9] cursor-not-allowed"
                }`}
                disabled={!otp}
                onClick={() => handleSubmitOtp(otp)}
              >
                Submit
              </button>
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
    </div>
  );
};

export default OTPSubmit;
