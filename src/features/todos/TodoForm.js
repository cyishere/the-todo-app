import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addNewTodo } from "./todosSlice";

const TodoForm = () => {
  const [todoInput, setTodoInput] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTodoInput(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();
    dispatch(
      addNewTodo({
        id: nanoid(),
        content: todoInput,
        completed: false,
      })
    );
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
