// Libraries
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// MUI Components
import AppBar from "@mui/material/AppBar";
import {
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Badge,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@mui/material";

import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const NavItemLink = ({ to, title }) => (
  <Box
    component={Link}
    to={to}
    sx={{ textDecoration: "none", color: "inherit" }}
  >
    <Button sx={{ my: 2, color: "black", display: "block" }}>
      {title}
    </Button>
  </Box>
);

const ClientNavBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
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

          <Box sx={{ display: "flex" }}>
            <IconButton
              size="large"
              color="inherit"
              LinkComponent={Link}
              to="/user/cart-items"
            >
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton
                sx={{ p: 0, ml: 1 }}
                onClick={handleOpenUserMenu}
              >
                <Avatar
                  alt="avatar sample"
                  src="/images/zarathelle-logo.png"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "50px" }}
              anchorEl={anchorElUser}
              keepMounted
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box
                component={Link}
                to="/user"
                sx={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem
                  onClick={handleCloseUserMenu}
                  sx={{ pr: 8 }}
                  LinkComponent={Link}
                  to="/user"
                >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
              </Box>
              <Box
                component={Link}
                to="/user/orders"
                sx={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Orders</Typography>
                </MenuItem>
              </Box>
              <Divider />
              <Box
                component={Link}
                to="/login"
                sx={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Log-out</Typography>
                </MenuItem>
              </Box>
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <NavItemLink to="/login" title="Login" />
            <NavItemLink to="/sign-up" title="Sign Up" />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

function NavBar() {
  let location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (location.pathname.match("admin")) {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  }, [location]);
  return <Box>{isAdmin && <ClientNavBar />}</Box>;
}

export default NavBar;
