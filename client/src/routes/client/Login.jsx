import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

function Login() {
  const theme = useTheme();
  return (
    <Box height="100vh">
      <Box
        sx={{
          background: `url("/images/login-bg.png") center center / cover no-repeat`,
          height: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&::before": {
            content: '""',
            display: "block",
            width: "100%",
            backgroundColor: "rgba(7,6,29,0.05)",
            top: 0,
            left: 0,
            zIndex: 1,
            height: "100%",
            position: "absolute",
          },
        }}
      >
        <Box
          sx={{
            zIndex: 1,
            ml: { xs: 0, md: 40, lg: "30%", xl: "50%" },
            width: { xs: "70%", md: 500 },
          }}
        >
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Login to your Account
            </Typography>
            <Box component="form" sx={{ width: "100%" }}>
              <TextField label="email" fullWidth />
              <TextField
                sx={{ mt: 2 }}
                type="password"
                label="password"
                fullWidth
              />
              <Box
                sx={{
                  display: "flex",
                  mt: 1,
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ width: { xs: "100%", md: 100 } }}
                >
                  Login
                </Button>
                <Typography>
                  Not registered?{" "}
                  <Box
                    component={Link}
                    to="/sign-up"
                    sx={{
                      textDecoration: "none",
                      color: theme.palette.secondary.main,
                    }}
                  >
                    Create an account
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
