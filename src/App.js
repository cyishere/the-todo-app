import { useState } from "react";
import "./App.css";

const data = [
  { id: 1, content: "Watch Tea with Mussolini", completed: false },
  {
    id: 2,
    content: "Learn the tutorial about checkbox with CSS",
    completed: false,
  },
  {
    id: 3,
    content: "Watch the last episode of 'The Mandalorian' season 2",
    completed: true,
  },
];

const generateId = (todos) => {
  return todos.length + 1;
};

const App = () => {
  const [todos, setTodos] = useState(data);
  const [todo, setTodo] = useState("");

  const handleOnChange = (e) => {
    setTodo(e.target.value);
  };

  const addTodo = () => {
    const newTodos = [
      ...todos,
      { id: generateId(todos), content: todo, completed: false },
    ];
    setTodos(newTodos);
    setTodo("");
  };

  return (
    <div className="container">
      <h1>Todo List</h1>

      <div className="add-control">
        <input
          type="text"
          className="todo"
          value={todo}
          onChange={handleOnChange}
        />
        <button className="btn" onClick={addTodo}>
          Add
        </button>
      </div>

      <div className="todo-list">
        <ul>
          {todos.map((todo) => (
            <li className="todo-time" key={todo.id}>
              <input
                type="checkbox"
                id={`todo${todo.id}`}
                defaultChecked={todo.completed}
              />
              <label
                htmlFor={`todo${todo.id}`}
                className={todo.completed ? "completed" : ""}
              >
                {todo.content}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
