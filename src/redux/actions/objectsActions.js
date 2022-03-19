import { ActionTypes } from "../constants/actions-types";
export const setObjects = (objects) => {
  return {
    type: ActionTypes.SET_OBJECTS,
    payload: objects,
  };
};
export const selectedObject = (objects) => {
  return {
    type: ActionTypes.SELECTED_OBJECT,
    payload: objects,
  };
};
export const filteredObjects = (newobjects) => {
  return {
    type: ActionTypes.FILTERED_OBJECTS,
    payload: newobjects,
  };
};
