import { configureStore } from "@reduxjs/toolkit";
import objectReducer from "./objects/objectSlice";
import imagesRedducer from "./ImagesSlice";
import firebaseReducer from "./firebaseDataSlice";
import carRentalReducer from "./carRentalSlice";
import filterReducer from "./filterSlice";
export const store = configureStore({
  reducer: {
    object: objectReducer,
    images: imagesRedducer,
    data: firebaseReducer,
    carRental: carRentalReducer,
    filter: filterReducer
  }
});
