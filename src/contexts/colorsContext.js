import { createContext, useState } from "react";

const ColorsContext = createContext({
  generateColors: null,
});

export const ColorsContextProvider = (props) => {
  const [colorVarients, setColorVarients] = useState({
    slate: null,
    gray: null,
    zinc: null,
    neutral: null,
    stone: null,
    red: null,
    orange: null,
    amber: null,
    yellow: null,
    lime: null,
    green: null,
    emerald: null,
    teal: null,
    cyan: null,
    sky: null,
    blue: null,
    indigo: null,
    violet: null,
    purple: null,
    fuchsia: null,
    pink: null,
    rose: null,
  });

  const generateColors = () => {
    for (let color in colorVarients) {
      let array = [];
      for (let i = 100; i < 1000; i = i + 100) {
        let colorString = `bg-${color}-${i}`;
        array.push(colorString);
      }
      array.unshift(`bg-${color}-50`);
      colorVarients[color] = array;
    }
    setColorVarients(colorVarients);
  };

  return (
    <ColorsContext.Provider
      value={{
        colorVarients: colorVarients,
        generateColors: generateColors,
      }}
    >
      {props.children}
    </ColorsContext.Provider>
  );
};

export default ColorsContext;
