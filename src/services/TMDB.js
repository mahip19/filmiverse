// RTK Query is a powerful data fetching and caching tool. It is designed to simplify common cases for loading data in a web application, eliminating the need to hand-write data fetching & caching logic yourself.

/*
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi
*/

// part of RTK query from /react as it also makes hooks for each query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
// https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",

  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    // get genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    getMovies: builder.query({
      // get movies
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //  movies by search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }

        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          //for category
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        console.log(genreIdOrCategoryName, "before id");

        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          //genre
          console.log("in here");
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&sort_by=popularity.desc&api_key=${tmdbApiKey}`;
        }

        // popular movies
        return `/movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),

    // get single movie
    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),

    //  get recommendation list for each user
    getRecommendations: builder.query({
      query: ({ movie_id, list }) =>
        `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
    }),

    // get actor details
    getActorDetails: builder.query({
      query: (id) => `/person/${id}?api_key=${tmdbApiKey}`,
    }),

    // get movies by person
    getMoviesByActor: builder.query({
      query: ({ actor_id, page }) =>
        `/discover/movie?with_cast=${actor_id}&page=${page}&api_key=${tmdbApiKey}`,
    }),

    // get movies list
    getList: builder.query({
      query: ({ listName, account_id, session_id, page }) =>
        `/account/${account_id}/${listName}?api_key=${tmdbApiKey}&session_id=${session_id}&page=${page}`,
    }),
  }),
});

export const {
  // hook for getmovies query to use it dierctly
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorDetailsQuery,
  useGetMoviesByActorQuery,
  useGetListQuery,
} = tmdbApi;
