import React, { useEffect } from "react";

import {
  Divider,
  List,
  ListItemText,
  ListItem,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";

import { Link } from "react-router-dom";

import { useTheme } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

import useStyles from "./styles";

import { useGetGenresQuery } from "../../services/TMDB";

import genreIcons from "../../assets/genres";
import { SendToMobile } from "@mui/icons-material";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];
const darkLOGO =
  "https://fontmeme.com/permalink/221122/d33499000af2e133d83e843bceb6d438.png";
const lightLOGO =
  "https://fontmeme.com/permalink/221122/8f1d2d6a112a07ef7a832c6f44a86bf8.png";

const Sidebar = ({ setMobileOpen }) => {
  // using selected state piece for mutation using useDispatch
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const theme = useTheme();
  const { classes } = useStyles();
  const { data, isFetching } = useGetGenresQuery();

  // const [mobileOpen, setobileOpen] = useState(second)

  // console.log(genreIdOrCategoryName);

  // allows us to dispatch actions (to send specific data from component to redux)
  const dispatch = useDispatch();

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          src={theme.palette.mode === "dark" ? lightLOGO : darkLOGO}
          alt="Filmiverse logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem
              button
              onClick={() => dispatch(selectGenreOrCategory(value))}
            >
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="4em" />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link key={name} className={classes.links} to="/">
              <ListItem
                onClick={() => dispatch(selectGenreOrCategory(id))}
                button
              >
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    className={classes.genreImages}
                    height={20}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
