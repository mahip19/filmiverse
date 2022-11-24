import { createSlice } from "@reduxjs/toolkit";
// genreOrCategory is a slice / piece of store
export const genreOrCategory = createSlice({
  name: "genreOrCategory",
  initialState: {
    genreIdOrCategoryName: "",
    page: 1,
    searchQuery: "",
  },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      // console.log(action);
      state.genreIdOrCategoryName = action.payload;
      state.searchQuery = "";
    },

    searchMovie: (state, action) => {
      console.log("in search-movie reducer", action.payload);
      state.searchQuery = action.payload;
    },
  },
});

export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;
export default genreOrCategory.reducer;
