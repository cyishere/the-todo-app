import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";

import { getAllTodosService } from "./services/todoServices";

const App = () => {
  const [todos, setTodos] = useState([]);

  const getAllTodos = async () => {
    const allTodos = await getAllTodosService();
    setTodos(allTodos.reverse());
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className="container">
      <Header />

      <TodoForm todos={todos} setTodos={setTodos} />

      <TodoList todos={todos} setTodos={setTodos} />

      <Footer />
    </div>
  );
};

export default App;
