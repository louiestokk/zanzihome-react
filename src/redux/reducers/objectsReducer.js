import { ActionTypes } from "../constants/actions-types";
import { objects } from "../../utils/data";
const initialState = {
  objects: objects,
};
export const objectsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_OBJECTS:
      return { ...state, objects: payload };
    default:
      return state;
  }
};

export const selectedObjectsreducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.SELECTED_OBJECT:
      return { ...state, objects: payload };
    default:
      return state;
  }
};
