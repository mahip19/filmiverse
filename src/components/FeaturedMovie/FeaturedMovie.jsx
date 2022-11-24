import React from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import useStyles from "./styles";
const FeaturedMovie = (movie) => {
  console.log("featuredMovie", movie);
  if (!movie) return null;

  const imageStyles = {
    media: {
      paddingTop: "80px", // 16:9,
      paddingBottom: "40px",
    },
  };
  const { classes } = useStyles();
  return (
    <Box
      component={Link}
      to={`/movie/${movie?.movies?.id}`}
      className={classes.featuredCardContainer}
    >
      <Card className={classes.card} classes={{ root: classes.cardRoot }}>
        <CardMedia
          picture
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/original/${movie?.movies?.backdrop_path}`}
          title={movie.title}
          className={classes.cardMedia}
        />
        <Box padding="20px">
          <CardContent
            className={classes.cardContent}
            classes={{ root: classes.cardContentRoot }}
          >
            <Typography variant="h5" gutterBottom>
              {movie.movies.title}
            </Typography>
            <Typography variant="body2">{movie?.movies?.overview}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
