import React, { useState, useEffect, useContext } from "react";

import { useSelector, useDispatch } from "react-redux";
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
  SendToMobileOutlined,
} from "@mui/icons-material";

// import { useTheme } from "@emotion/react";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import { Sidebar, Search } from "..";
import { fetchToken, createSessionId, moviesApi } from "../../utils";

import { ColorModeContext } from "../../utils/ToggleColorMode";

import useStyles from "./styles";

import { setUser, userSelector } from "../../features/auth";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);

  const dispatch = useDispatch();

  const colorMode = useContext(ColorModeContext);

  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");

  console.log("user obj after implementing auth", user);

  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        // if sesssion_id is already present
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );
          console.log(1);
          dispatch(setUser(userData));
        } else {
          //  if session-id is not present, call createsessionid
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );
          console.log(2);
          dispatch(setUser(userData));
        }
      }
    };
    loginUser();
  }, [token]);
  console.log("current user", user);
  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {/* doesnt show search and mymovies to mobile users */}
                {!isMobile && <>MyMovies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={`https://www.themoviedb.org/t/p/w150_and_h150_face${user?.avatar?.tmdb?.avatar_path}`}
                ></Avatar>
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={() => setMobileOpen(!mobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};
export default Navbar;
