import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:3001/todos";

const initialState = [];

// Communicate with API
export const getAllTodos = createAsyncThunk("todos/getAllTodos", async () => {
  const response = await axios.get(url);
  return response.data;
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoAdded: (state, action) => {
      return [action.payload, ...state];
    },
  },
  extraReducers: {
    [getAllTodos.fulfilled]: (state, action) => state.concat(action.payload),
  },
});

export const { todoAdded } = todosSlice.actions;

export default todosSlice.reducer;

// =======
export const selectAllTodos = (state) => state.todos;
