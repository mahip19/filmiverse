import React, { useState } from "react";

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

import useStyles from "./styles";

import { useParams, useNavigate } from "react-router-dom";

import {
  useGetActorDetailsQuery,
  useGetMoviesByActorQuery,
} from "../../services/TMDB";

import { MovieList, Pagination } from "..";

const Actors = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetActorDetailsQuery(id);
  console.log("actor data", data);

  const { data: moviesByActor, isFetching: isActorMoviesFetching } =
    useGetMoviesByActorQuery({ actor_id: id, page: page });

  console.log("actor movies", moviesByActor);

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
        <Button endIcon={<ArrowBack />} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>
    );
  }
  return (
    <>
      <Grid container spacing={3} className={classes.containerSpaceAround}>
        <Grid item xl={4} lg={5}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`}
            alt={data.name}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          style={{
            display: "flex",
            justifuContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || "Sorry, we could not find any more details."}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              color="primary"
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>

        {moviesByActor && (
          <MovieList movies={moviesByActor} numberOfMovies={12} />
        )}
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={moviesByActor?.total_pages}
        />
      </Box>
    </>
  );
};
export default Actors;
