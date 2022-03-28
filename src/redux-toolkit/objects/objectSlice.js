import { createSlice } from "@reduxjs/toolkit";
import { objects } from "../../utils/data";
const initialState = {
  object: objects,
};

const objectSlice = createSlice({
  name: "object",
  initialState,
  reducers: {
    filterObjects: (state = initialState, { payload }) => {
      state.object = payload;
    },
  },
});

export const getAllObjects = (state) => state.object.object;
export const { filterObjects } = objectSlice.actions;

export default objectSlice.reducer;
