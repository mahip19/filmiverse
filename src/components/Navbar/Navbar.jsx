import React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";

// import { useTheme } from "@emotion/react";
import { useTheme } from "@mui/material";
import Link from "react-router-dom";

import useStyles from "./styles";

const Navbar = () => {
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => {}}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        )}
        <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
          {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        {!isMobile && "Search..."}
        <div>{/* add authenticated login logout components */}</div>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
