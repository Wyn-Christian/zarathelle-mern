import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminNavBar from "../../components/AdminNavbar";

const drawerWidth = 240;

function AdminRoot() {
  return (
    <Box display="flex">
      <AdminNavBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminRoot;
