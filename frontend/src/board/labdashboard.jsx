
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BuildIcon from "@mui/icons-material/Build";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import { Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 240;

/* ✅ DARK GREEN COLOR */
const themeColor = "#14532d";   // Dark Green

function LabDashboard() {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Equipment", icon: <BuildIcon />, path: "/equipment" },
    { text: "Collaboration", icon: <GroupIcon />, path: "/collaboration" },
    { text: "Lab Booking", icon: <EventAvailableIcon />, path: "/booking" },
    { text: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* ✅ APP BAR */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: themeColor,
          color: "white",
        }}
      >
        <Toolbar>
          <IconButton sx={{ color: "white" }}>
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              ml: 2,
              fontWeight: "bold",
              color: "white",
            }}
          >
            LABS Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* ✅ SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: themeColor,
            color: "white",
          },
        }}
      >
        <Toolbar />
        <Divider sx={{ backgroundColor: "#1f7a4c" }} />

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  "&:hover": { backgroundColor: "#166534" }, // Slight lighter dark green hover
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* ✅ PAGE CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default LabDashboard;
