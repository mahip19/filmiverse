import React, { useState, useEffect } from "react";

import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from "@mui/material";

import {
  Theaters,
  Movie as MovieIcon,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
  SetMeal,
} from "@mui/icons-material";

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetListQuery,
} from "../../services/TMDB";

import axios from "axios";

import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

import genreIcons from "../../assets/genres";

import useStyles from "./styles";

import { MovieList } from "..";

import { userSelector } from "../../features/auth";

const MovieInformation = () => {
  const { user } = useSelector(userSelector);
  const { classes } = useStyles();
  const { id } = useParams();
  const dispath = useDispatch();
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);
  const [open, setOpen] = useState(false);

  const { data, isFetching, error } = useGetMovieQuery(id);
  console.log("movie data:", data);

  const { data: recommendations, isFetching: isRecommendationFetching } =
    useGetRecommendationsQuery({ movie_id: id, list: "recommendations" });

  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    account_id: user.id,
    session_id: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistMovies } = useGetListQuery({
    listName: "watchlist/movies",
    account_id: user.id,
    session_id: localStorage.getItem("session_id"),
    page: 1,
  });

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);
  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistMovies, data]);

  // console.log("recommended movies", recommendations, "movie_id", id);

  // here, we make direct api calls instead of using hooks
  // because we can only use hooks on global level, and we dont want that here
  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavorited,
      }
    );
    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchlisted,
      }
    );
    setIsMovieWatchlisted((prev) => !prev);
  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something went wrong, go back</Link>
      </Box>
    );
  }

  return (
    <Grid
      container
      className={classes.containerSpaceAround}
      style={{ marginTop: "30px" }}
    >
      <Grid
        item
        sm={12}
        lg={4}
        // style={{ display: "flex", marginBottom: "30px" }}
      >
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
          alt={data.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} : ({data?.release_date.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: "10px" }}
            >
              {data?.vote_average.toFixed(1)}/10
            </Typography>
          </Box>
          <Typography variant="h6" gutterBottom align="center">
            {data?.runtime}min
            {`| ${data?.spoken_languages[0].english_name}`}
          </Typography>
        </Grid>
        {/* for genres */}
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre, i) => (
            <Link
              className={classes.links}
              to="/"
              onClick={() => dispath(selectGenreOrCategory(genre.id))}
              key={genre.name}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                className={classes.genreImage}
                height={20}
              />
              <Typography
                color="textPrimary"
                variant="subtitle1"
                style={{ textDecoration: "none" }}
              >
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" style={{ marginTop: "10px" }} gutterBottom>
          Overview
        </Typography>
        <Typography marginBottom="2rem">{data?.overview}</Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        {/* top cast */}
        <Grid item container spacing={2}>
          {data &&
            data.credits.cast
              .map(
                (character, i) =>
                  character.profile_path && (
                    <Grid
                      key={i}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${character.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        className={classes.castImage}
                        src={
                          character.profile_path
                            ? `https://image.tmdb.org/t/p/w500/${character.profile_path}`
                            : "https://fillmurray.com/200/300"
                        }
                      />
                      <Typography color="textPrimary">
                        {character?.name}
                      </Typography>
                      <Typography color="secondary">
                        {character.character.split("/")[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        {/*   BUTTONS GROUP */}
        <Grid item container style={{ marginTop: "2rem" }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" color="secondary" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https:/www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" color="error" variant="outlined">
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? "Unfavorite" : "Favorite"}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  // sx={{ borderColor: "primary.main" }}
                >
                  <Typography
                    component={Link}
                    to="/"
                    color="inherit"
                    variant="subtitle2"
                    style={{ textDecoration: "none" }}
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      {/* RECOMMENDED MOVIES LIST*/}
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {/* look through recommended movies  */}
        {recommendations ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box>Sorry, noting similar was found</Box>
        )}
      </Box>

      {/* MODAL FOR MOVIE TRAILER */}
      {console.log(data.videos.results)}
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoplay
            className={classes.videos}
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          ></iframe>
        )}
      </Modal>
    </Grid>
  );
};
export default MovieInformation;
