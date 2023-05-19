import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  searchQuery: "",
  areaQuery: ""
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchQuery: (state = initialState, { payload }) => {
      state.searchQuery = payload;
    },
    setAreaQuery: (state = initialState, { payload }) => {
      state.areaQuery = payload;
    }
  }
});
export const getFilteredQuerys = (state) => state.filter;
export const { setSearchQuery, setAreaQuery } = filterSlice.actions;
export default filterSlice.reducer;
