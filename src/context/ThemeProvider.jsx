import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#90caf9",
      light: "#e3f2fd",
      dark: "#42a5f5",
    },
    secondary: {
      light: "#f3e5f5",
      main: "#ce93d8",
      dark: "#ab47bc",
      cyan: "#00FFFF",
      contrastText: "#ffcc00",
    },
    teal: {
      main: "#008080",
      light: "#0aadad",
      dark: "#045252",
    },
    common: {
      white: "#ffffff",
      black: "#000000",
    },
  },
});

export default theme;
