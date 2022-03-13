import { combineReducers } from "redux";
import { objectsReducer, selectedObjectsreducer } from "./objectsReducer";
const reducers = combineReducers({
  allObjects: objectsReducer,
  object: selectedObjectsreducer,
});
export default reducers;
