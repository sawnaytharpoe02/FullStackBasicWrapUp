import React, { useMemo } from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { overrides } from "./overrides";
import { palette } from "./palette";
import { typography } from "./typography";
import { ThemeOptions } from "@mui/material/styles";

interface MyThemeOptions extends ThemeOptions {}

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const memoizedValue: MyThemeOptions = useMemo<MyThemeOptions>(
    () => ({
      palette: palette(),
      components: overrides(),
      typography: typography(),
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
