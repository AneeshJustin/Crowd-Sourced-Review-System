import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Toolbar,
} from "@mui/material";
import {
  Home as HomeIcon,
  Movie as MovieIcon,
  AddBoxOutlined as AddBoxOutlinedIcon,
  DevicesOther as DevicesOtherIcon,
  Hotel as HotelIcon,
  DirectionsCarFilled as DirectionsCarFilledIcon,
  Restaurant as RestaurantIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

const SidebarLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarMenu = [
    { icon: <HomeIcon />, label: "Home", path: "/" },
    { icon: <MovieIcon />, label: "Movie Review", path: "/feed/movies" },
    { icon: <DevicesOtherIcon />, label: "Electronics", path: "/feed/electronics" },
    { icon: <HotelIcon />, label: "Hotels", path: "/feed/hotels" },
    { icon: <DirectionsCarFilledIcon />, label: "Vehicles", path: "/feed/vehicles" },
    { icon: <RestaurantIcon />, label: "Restaurants", path: "/feed/restaurants" },
    { icon: <AddBoxOutlinedIcon />, label: "Create", path: "/add" },
  ];

  return (
    <Box>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            padding: 2,
          },
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          RatingRealm
        </Typography>

        <List>
          {sidebarMenu.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItemButton
                key={idx}
                selected={isActive}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          })}
        </List>

        <Box mt="auto">
          <ListItemButton onClick={() => navigate("/profile")}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px`, overflow: "auto" }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default SidebarLayout;
