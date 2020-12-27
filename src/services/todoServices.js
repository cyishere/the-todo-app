import axios from "axios";

const url = "http://localhost:3001/todos";

const getAllTodosService = async () => {
  const response = await axios.get(url);
  return response.data.sort((a, b) => (a.id < b.id ? b : a));
};

const addNewTodoService = async (todo) => {
  const response = await axios.post(url, todo);
  return response.data;
};

const deleteTodoService = async (todoId) => {
  const response = await axios.delete(`${url}/${todoId}`);
  return response.data;
};

const updateTodoService = async (todoId, updateInfo) => {
  const response = await axios.put(`${url}/${todoId}`, updateInfo);
  return response.data;
};

const getOneTodoService = async (todoId) => {
  const response = await axios.get(`${url}/${todoId}`);
  return response.data;
};

export {
  getAllTodosService,
  addNewTodoService,
  deleteTodoService,
  updateTodoService,
  getOneTodoService,
};
