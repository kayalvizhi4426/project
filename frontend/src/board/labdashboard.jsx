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
import { useState } from "react";

const drawerWidth = 240;
const themeColor = "#14532d";

function LabDashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const menuItems = [
    { text: "Dashboard Overview", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
    { text: "Equipment", icon: <BuildIcon />, path: "/equipment" },
    { text: "Collaboration", icon: <GroupIcon />, path: "/collaboration" },
    { text: "Lab Booking", icon: <EventAvailableIcon />, path: "/booking" },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <CssBaseline />

      {/* ✅ SIDEBAR */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: open ? drawerWidth : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: themeColor,
            color: "white",
            transform: open ? "translateX(0)" : `translateX(-${drawerWidth}px)`,
            transition: "transform 0.3s ease",
            position: "relative",
            height: "100vh",
            overflow: "auto",
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
                  "&:hover": { backgroundColor: "#166534" },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* ✅ MAIN AREA */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          display: "flex", 
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* APP BAR */}
        <AppBar
          position="static"
          sx={{
            backgroundColor: themeColor,
            transition: "all 0.3s ease",
            flexShrink: 0,
          }}
        >
          <Toolbar>
            <IconButton color="inherit" onClick={handleToggle}>
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>
              LABS Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        {/* PAGE CONTENT - SCROLLABLE ONLY HERE */}
        <Box
          component="main"
          sx={{
            p: 3,
            bgcolor: "#f5f7fa",
            flexGrow: 1,
            overflow: "auto",
            height: "100%",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default LabDashboard;