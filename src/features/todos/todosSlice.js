import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:3001/todos";

const initialState = [];

// Communicate with API
export const getAllTodos = createAsyncThunk("todos/getAllTodos", async () => {
  const response = await axios.get(url);
  return response.data;
});

export const addNewTodo = createAsyncThunk("todos/addNewTodo", async (todo) => {
  const response = await axios.post(url, todo);
  return response.data;
});

export const getOneTodo = createAsyncThunk(
  "todos/getOneTodo",
  async (todoId) => {
    const response = await axios.get(`${url}/${todoId}`);
    return response.data;
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updateInfo) => {
    try {
      const response = await axios.put(`${url}/${updateInfo.id}`, updateInfo);
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId) => {
    await axios.delete(`${url}/${todoId}`);
    return todoId;
  }
);

// The Slice
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllTodos.fulfilled]: (state, action) => state.concat(action.payload),
    [addNewTodo.fulfilled]: (state, action) => [action.payload, ...state],
    [updateTodo.fulfilled]: (state, action) => {
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    },
    [deleteTodo.fulfilled]: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export default todosSlice.reducer;

// =======
export const selectAllTodos = (state) => state.todos;
