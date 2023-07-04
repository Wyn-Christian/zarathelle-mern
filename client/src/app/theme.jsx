import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
	palette: {
		primary: {
			main: "#fbd5d5",
		},
		secondary: {
			main: "#e78686",
		},
	},
});

theme = responsiveFontSizes(theme);

export default theme;
