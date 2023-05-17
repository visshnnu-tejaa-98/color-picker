import React, { useState } from "react";

const ColorBlock = ({ mainColor, colors }) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <div>
      <div>
        <h2 className="text-center md:text-left text-3xl my-5">
          Feeling {mainColor}
        </h2>
        <div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5"
          style={{ gap: "1rem" }}
        >
          {colors &&
            colors.map((clr, idx) => (
              <div
                key={clr}
                style={{
                  backgroundColor: `${clr}`,
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "1rem",
                  cursor: "pointer",
                }}
                className="w-[100%] h-[100px] color-tile"
                onClick={() => {
                  setIsCopied(true);
                  navigator.clipboard.writeText(clr.toUpperCase());
                  setTimeout(() => {
                    setIsCopied(false);
                  }, 500);
                }}
              >
                <div className="color-code">
                  <p
                    onClick={() => {
                      setIsCopied(true);
                      navigator.clipboard.writeText(clr.toUpperCase());
                      setTimeout(() => {
                        setIsCopied(false);
                      }, 500);
                    }}
                  >
                    <span className={!isCopied ? "" : "text-[#22CB5C]"}>
                      {!isCopied ? `${clr?.toUpperCase()}` : "Copied!"}
                    </span>
                    {!isCopied ? (
                      <span className="material-symbols-outlined scale-75">
                        content_paste
                      </span>
                    ) : (
                      <span className="material-symbols-outlined scale-75 text-[#22CB5C]">
                        inventory
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ColorBlock;
