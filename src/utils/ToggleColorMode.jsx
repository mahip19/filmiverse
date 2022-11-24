import React, { createContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

/*
    CONTEXT:
Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.

*/
export const ColorModeContext = createContext();

const ToggleColorMode = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // only change when 'mode' changes
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
