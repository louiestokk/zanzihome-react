import { configureStore } from "@reduxjs/toolkit";
import objectReducer from "./objects/objectSlice";

export const store = configureStore({
  reducer: {
    object: objectReducer,
  },
});
