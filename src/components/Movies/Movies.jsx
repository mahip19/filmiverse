import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";

import { useGetMoviesQuery } from "../../services/TMDB";
import { MovieList } from "..";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { Pagination, FeaturedMovie } from "..";

const Movies = () => {
  const [page, setPage] = useState(1);

  // small fix for showing movies poster in home
  const lg = useMediaQuery((theme) => theme.breakpoints.only("lg"));

  const numberOfMovies = lg ? 17 : 19;

  // using selected state piece for mutation using useDispatch
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });
  // console.log("data from movies.jsx", data);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4em" />
      </Box>
    );
  }
  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center">
        <Typography variant="h4">
          No movies match that name
          <br />
          Please search for something else
        </Typography>
      </Box>
    );
  }

  if (error) {
    return "error occured";
  }

  return (
    <div>
      <FeaturedMovie movies={data.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPages={data.total_pages}
      />
    </div>
  );
};
export default Movies;
