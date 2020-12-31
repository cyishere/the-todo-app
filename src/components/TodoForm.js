import { useState } from "react";
import { addNewTodoService } from "../services/todoServices";

const generateId = (todos) => {
  const ids = todos.map((todo) => todo.id);
  return Math.max(...ids) + 1;
};

const TodoForm = ({ todos, setTodos }) => {
  const [todoInput, setTodoInput] = useState("");

  const handleChange = (e) => {
    setTodoInput(e.target.value);
  };

  const addTodo = async (e) => {
    e.preventDefault();

    const newTodo = {
      id: generateId(todos),
      content: todoInput,
      completed: false,
    };
    const newTodos = [newTodo, ...todos];
    await addNewTodoService(newTodo);
    setTodos(newTodos);
    setTodoInput("");
  };

  return (
    <form className="add-control" onSubmit={addTodo}>
      <input
        type="text"
        className="todo"
        value={todoInput}
        onChange={handleChange}
      />
      <button className="btn primary" type="submit">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
