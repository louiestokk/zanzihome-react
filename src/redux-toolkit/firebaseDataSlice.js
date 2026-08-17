import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rawItems: [],
  filteredItems: []
};

const firebaseDataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setFirestoreData: (state, action) => {
      const payload = action.payload || [];
      if (state.rawItems.length === 0 || payload.length > state.rawItems.length + 5) {
        state.rawItems = payload;
      }
      state.filteredItems = payload;
    },
    setFilteredData: (state, action) => {
      state.filteredItems = action.payload || [];
    }
  }
});

export const getFirestoreData = (state) => {
  if (Array.isArray(state.data)) {
    return state.data;
  }
  return state.data?.filteredItems || [];
};

export const getRawFirestoreData = (state) => {
  if (Array.isArray(state.data)) {
    return state.data;
  }
  return state.data?.rawItems || [];
};

export const { setFirestoreData, setFilteredData } = firebaseDataSlice.actions;

export default firebaseDataSlice.reducer;
