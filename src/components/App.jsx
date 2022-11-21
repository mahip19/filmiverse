import React from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import { Actors, Movies, MovieInformation, Navbar, Profile } from "./index";
import useStyles from "./styles";

const App = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolkit}>
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieInformation />} />
            <Route path="/actors/:id" element={<Actors />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
export default App;
