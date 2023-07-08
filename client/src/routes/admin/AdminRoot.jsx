import { Box, Toolbar } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/usersSlice";
import { useEffect } from "react";

import AdminNavBar from "../../components/AdminNavBar";

const drawerWidth = 240;

function AdminRoot() {
	const navigate = useNavigate();
	const user = useSelector(userSelector);
	useEffect(() => {
		if (user.position !== "admin") {
			navigate("/");
		}
	}, [user]);
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
