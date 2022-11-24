import React, { useEffect, useContext } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { redirect, useNavigate } from "react-router";
import { ColorModeContext } from "../utils/ToggleColorMode";
import { fetchToken } from "../utils";
import { useDispatch } from "react-redux";
import {
  selectGenreOrCategory,
  searchMovie,
} from "../features/currentGenreOrCategory";

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    alanBtn({
      key: "3a28b9b6fbff86dd254588fa02d56c6d2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, mode, genres, genreOrCategory }) => {
        if (command === "chooseGenre") {
          const foundGenre = genres.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          );
          if (foundGenre) {
            navigate("/");
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith("top")
              ? "top_rated"
              : genreOrCategory;
            navigate("/");
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === "changeMode") {
          // Call the client code that will react to the received command
          if (mode === "light") {
            setMode("light");
          } else {
            setMode("dark");
          }
        } else if (command === "login") {
          fetchToken();
        } else if (command === "logout") {
          localStorage.clear();
          window.location.href = "/";
        }
        alanBtn.deactivate();
      },
    });
  }, []);
};

export default useAlan;
