import { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

import {
  getAllTodosService,
  addNewTodoService,
  deleteTodoService,
  getOneTodoService,
  updateTodoService,
} from "./services/todoServices";

const generateId = (todos) => {
  const ids = todos.map((todo) => todo.id);
  return Math.max(...ids) + 1;
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [update, setUpdate] = useState("");

  const getAllTodos = async () => {
    const allTodos = await getAllTodosService();
    setTodos(allTodos.reverse());
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const addTodo = async (e) => {
    e.preventDefault();

    const newTodo = { id: generateId(todos), content: todo, completed: false };
    const newTodos = [newTodo, ...todos];
    await addNewTodoService(newTodo);
    setTodos(newTodos);
    setTodo("");
  };

  const deleteTodo = async (todoId) => {
    await deleteTodoService(todoId);
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
    alert(`#${todoId} todo is deleted.`);
  };

  const toggleCompleted = async (todoId) => {
    const standByTodo = await getOneTodoService(todoId);
    const updateInfo = { ...standByTodo, completed: !standByTodo.completed };
    const updatedTodo = await updateTodoService(todoId, updateInfo);
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    setTodos(updatedTodos);
  };

  const handleUpdateChange = (e) => {
    setUpdate(e.target.value);
  };

  const updateTodo = async (todoId) => {
    const standByTodo = todos.find((todo) => todo.id === todoId);
    const updateInfo = { ...standByTodo, content: update };
    const updatedTodo = await updateTodoService(todoId, updateInfo);
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <h1>Todo List</h1>

      <TodoForm todo={todo} handleChange={handleChange} addTodo={addTodo} />

      <div className="todo-list">
        {todos.length < 1 ? (
          <p className="todo-item">Loading...</p>
        ) : (
          <ul>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                toggleCompleted={toggleCompleted}
                handleChange={handleUpdateChange}
                updateTodo={updateTodo}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
