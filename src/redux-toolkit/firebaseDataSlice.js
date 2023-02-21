import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: []
};

const firebaseDataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setFirestoreData: (state = initialState, { payload }) => {
      state.data = payload;
    }
  }
});

export const getFirestoreData = (state) => state.data.data;
export const { setFirestoreData } = firebaseDataSlice.actions;

export default firebaseDataSlice.reducer;
