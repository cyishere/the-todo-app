import { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

import { getAllTodosService } from "./services/todoServices";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [showClosed, setShowClosed] = useState(false);

  const getAllTodos = async () => {
    const allTodos = await getAllTodosService();
    setTodos(allTodos.reverse());
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const unCompletedTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const showClosedTodos = () => {
    setShowClosed(!showClosed);
  };

  return (
    <div className="container">
      <h1>Todo List</h1>

      <TodoForm
        todoInput={todoInput}
        setTodoInput={setTodoInput}
        todos={todos}
        setTodos={setTodos}
      />

      <div className="todo-list">
        {unCompletedTodos.length < 1 ? (
          <p className="todo-item">Loading...</p>
        ) : (
          <ul>
            {unCompletedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
          </ul>
        )}
      </div>

      <button className="btn" onClick={showClosedTodos}>
        {showClosed ? "➖ Hide closed tasks" : "➕ Show closed tasks"}
      </button>

      {showClosed && (
        <div className="todo-list">
          {completedTodos.length < 1 ? (
            <p>There's no closed tasks.</p>
          ) : (
            <ul>
              {completedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
