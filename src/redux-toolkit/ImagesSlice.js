import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  images: []
};

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImagesUrl: (state = initialState, { payload }) => {
      state.images.push(payload);
    }
  }
});

export const getImages = (state) => state.images.images;
export const { setImagesUrl } = imagesSlice.actions;

export default imagesSlice.reducer;
