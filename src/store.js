import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import todosReducer from "./features/todos/todosSlice";

const composeEnhancer = composeWithDevTools();

const store = createStore(todosReducer, composeEnhancer);

export default store;
