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
  Collapse,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CategoryIcon from "@mui/icons-material/Category";
import PixIcon from "@mui/icons-material/Pix";

import ViewListIcon from "@mui/icons-material/ViewList";
import CreateIcon from "@mui/icons-material/Create";

const drawerWidth = 240;

const NestedNavLinks = ({ text, Icon }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={text} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            LinkComponent={Link}
            to={`/admin/${text.toLowerCase()}/list`}
          >
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary={"List"} />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            LinkComponent={Link}
            to={`/admin/${text.toLowerCase()}/create`}
          >
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary={"Create"} />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};

const AdminNavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} to={`/admin`}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Overview"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <NestedNavLinks text="Customers" Icon={PermIdentityIcon} />
        <NestedNavLinks text="Collections" Icon={CategoryIcon} />
        <NestedNavLinks text="Products" Icon={PixIcon} />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} to={`/admin/orders`}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Orders"} />
            </ListItemButton>
          </ListItem>
        </List>
      </List>
    </div>
  );

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box>
            <Link
              to="/admin"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
              }}
            >
              <img
                src="/images/zarathelle-logo.png"
                style={{
                  height: 50,
                  padding: 5,
                }}
              />
            </Link>
          </Box>

          <Typography variant="h6" noWrap component="div">
            Zarathelle Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};
export default AdminNavBar;
