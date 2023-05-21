import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: "#fbd5d5",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
