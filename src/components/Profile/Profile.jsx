import React, { useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { ExitToApp } from "@mui/icons-material";
import useStyles from "./styles";
import { useGetListQuery } from "../../services/TMDB";
import { RatedCards } from "..";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const { classes } = useStyles();

  // refetch reloads after each call
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: "favorite/movies",
    account_id: user.id,
    session_id: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetListQuery({
      listName: "watchlist/movies",
      account_id: user.id,
      session_id: localStorage.getItem("session_id"),
      page: 1,
    });

  useEffect(() => {
    refetchFavorites(), refetchWatchlisted();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.profileBox}
      >
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant="h5">Add favorites</Typography>
      ) : (
        <Box>
          <RatedCards title="Favorite Movies" data={favoriteMovies} />
          <RatedCards title="Watchlist Movies" data={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
};
export default Profile;
