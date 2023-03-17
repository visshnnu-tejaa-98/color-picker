import React, { useState } from "react";

const ColorBlock = ({ mainColor, colors }) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <div className="flex justify-center gap-5">
      <div>
        <h2 className="text-center md:text-left text-3xl my-5">
          Feeling {mainColor}
        </h2>
        <div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10"
          style={{ gap: "1rem" }}
        >
          {colors &&
            colors.map((clr, idx) => (
              <div
                key={clr}
                style={{
                  width: "100px",
                  height: "220px",
                  backgroundColor: `${clr}`,
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "1rem",
                  cursor: "pointer",
                }}
                className="color-tile"
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
                      {clr?.toUpperCase()}
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
