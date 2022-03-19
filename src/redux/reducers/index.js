import { combineReducers } from "redux";
import {
  objectsReducer,
  selectedObjectsreducer,
  filteredObjectsReducer,
} from "./objectsReducer";
const reducers = combineReducers({
  allObjects: objectsReducer,
  object: selectedObjectsreducer,
  filtered: selectedObjectsreducer,
});
export default reducers;
