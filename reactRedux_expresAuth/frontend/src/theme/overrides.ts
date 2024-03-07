import { ThemeOptions } from "@mui/material";

export const overrides = (): ThemeOptions["components"] => {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          WebkitOverflowScrolling: "touch",
        },
        body: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
        },
        "#root": {
          width: "100%",
          height: "100%",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: ".5rem",
          color: "#eee",
          textTransform: "capitalize",
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          borderRadius: ".5rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
      defaultProps: {
        size: "small",
        InputLabelProps: {
          shrink: true,
        },
      },
    },
  };
};
