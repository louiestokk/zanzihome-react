import { configureStore } from "@reduxjs/toolkit";
import objectReducer from "./objects/objectSlice";
import imagesRedducer from "./ImagesSlice";
import firebaseReducer from "./firebaseDataSlice";
export const store = configureStore({
  reducer: {
    object: objectReducer,
    images: imagesRedducer,
    data: firebaseReducer
  }
});
