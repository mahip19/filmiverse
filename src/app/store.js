import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";
// attaching reducers to store
import genreOrCategoryReducer from "../features/currentGenreOrCategory";
import userReducer from "../features/auth";

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
