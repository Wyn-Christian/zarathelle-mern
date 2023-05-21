// Libraries
import { Link } from "react-router-dom";

// MUI Components
import AppBar from "@mui/material/AppBar";
import { Box, Button, Container, Toolbar } from "@mui/material";

function NavBar() {
  return (
    <AppBar>
      <Container>
        <Toolbar>
          <Box>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
              }}
            >
              <img
                src="/images/zarathelle-logo.png"
                style={{
                  height: 85,
                  padding: 5,
                }}
              />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link
              to="/"
              style={{ textDecoration: "none", colro: "inherit" }}
            >
              <Button sx={{ my: 2, color: "black", display: "block" }}>
                Home
              </Button>
            </Link>
            <Link
              to="/collections"
              style={{ textDecoration: "none", colro: "inherit" }}
            >
              <Button sx={{ my: 2, color: "black", display: "block" }}>
                Collections
              </Button>
            </Link>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link
              to="/login"
              style={{ textDecoration: "none", colro: "inherit" }}
            >
              <Button sx={{ my: 2, color: "black", display: "block" }}>
                Login
              </Button>
            </Link>
            <Link
              to="/sign-up"
              style={{ textDecoration: "none", colro: "inherit" }}
            >
              <Button sx={{ my: 2, color: "black", display: "block" }}>
                Sign Up
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
