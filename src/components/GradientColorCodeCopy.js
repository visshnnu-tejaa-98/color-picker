import React, { useState } from "react";

// props: clr comes as string: "#cecec1"
const GradientColorCodeCopy = ({ clr }) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <span
      className={`flex items-center gap-1 px-2 my-1 rounded cursor-pointer w-[100px] ${
        !isCopied ? "hover:bg-[#6f2193]" : ""
      }`}
      onClick={() => {
        setIsCopied(true);
        navigator.clipboard.writeText(clr?.toUpperCase());
        setTimeout(() => {
          setIsCopied(false);
        }, 500);
      }}
    >
      {!isCopied ? (
        <div
          className={`w-4 h-4 border-2 border-[#cccccc] inline-block`}
          style={{ backgroundColor: clr }}
        ></div>
      ) : (
        <span
          className="material-symbols-outlined text-sm"
          style={{ color: clr }}
        >
          check
        </span>
      )}
      <span
        className="font-semibold"
        style={{ color: !isCopied ? "#cccccc" : clr }}
      >
        {!isCopied ? clr.toUpperCase() : "Copied!"}
      </span>
    </span>
  );
};

export default GradientColorCodeCopy;
