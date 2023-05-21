import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

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
