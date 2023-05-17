import React, { useState } from "react";

// props: color comes like string :#a2b2c3
const PalleteColorCopy = ({ color }) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <span
      onClick={() => {
        setIsCopied(true);
        navigator.clipboard.writeText(color.toUpperCase());
        setTimeout(() => {
          setIsCopied(false);
        }, 500);
      }}
      className={`text-[#ffffff] absolute bottom-0 left-0 text-sm rounded-tr cursor-pointer py-0.5 px-1.5 bg-[#00000059] w-[80px] flex justify-center`}
    >
      {!isCopied ? (
        color?.toUpperCase()
      ) : (
        <span className="flex items-center">
          <span className="material-symbols-outlined h-1 relative top-[-9px]">
            check
          </span>
          <span>Copied!</span>
        </span>
      )}
    </span>
  );
};

export default PalleteColorCopy;
