import React, { useRef } from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes, useRoutes } from "react-router-dom";

import { Actors, Movies, MovieInformation, Navbar, Profile } from "./index";
import useStyles from "./styles";

import useAlan from "./Alan";

const App = () => {
  const { classes } = useStyles();

  const alanBtnContainer = useRef();
  useAlan();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolkit}>
          <Routes>
            {["/", "/approved"].map((path) => (
              <Route path={path} element={<Movies />} />
            ))}
            <Route path="/movie/:id" element={<MovieInformation />} />
            <Route path="/actors/:id" element={<Actors />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </div>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  );
};
export default App;
