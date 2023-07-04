import { Outlet } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

// Components
import NavBar from "../components/NavBar";

function Root() {
	return (
		<Box>
			<CssBaseline />
			<NavBar />
			<Outlet />
		</Box>
	);
}

export default Root;
