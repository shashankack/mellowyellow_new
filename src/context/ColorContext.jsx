import { createContext, useState, useContext } from "react";
import { themes } from "../config/themes";

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes[0]);

  return (
    <ColorContext.Provider value={{ theme, setTheme }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);
