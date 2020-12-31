import { useState } from "react";
import {
  deleteTodoService,
  getOneTodoService,
  updateTodoService,
} from "../services/todoServices";

const TodoItem = ({ todo, todos, setTodos }) => {
  const classes = todo.completed ? "completed" : "";
  const [update, setUpdate] = useState(todo.content);
  const [status, setStatus] = useState("idle");

  const handleCancel = () => {
    setStatus("edle");
  };

  const handleUpdateChange = (e) => {
    setStatus("editing");
    setUpdate(e.target.value);
  };

  const updateTodo = async (todoId, origin) => {
    setStatus("idle");
    const updateInfo = { ...origin, content: update };
    await updateTodoService(todoId, updateInfo);
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

  const deleteTodo = async (todoId) => {
    await deleteTodoService(todoId);
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
    // alert(`#${todoId} todo is deleted.`);
  };

  const btnControls =
    status === "editing" ? (
      <>
        <button
          className="btn secondary"
          onClick={() => updateTodo(todo.id, todo)}
        >
          Save
        </button>
        <button className="btn" onClick={handleCancel}>
          Cancel
        </button>
      </>
    ) : (
      <button className="btn text" onClick={() => deleteTodo(todo.id)}>
        Delete
      </button>
    );

  return (
    <li className={`todo-item ${classes}`}>
      <div className="todo-item_main">
        <div className="form-control">
          <input
            type="checkbox"
            defaultChecked={todo.completed}
            onClick={() => toggleCompleted(todo.id)}
          />
        </div>
        <input
          type="text"
          className="todo-item_content"
          value={update}
          onChange={handleUpdateChange}
          disabled={todo.completed}
        />
      </div>

      <div className="todo-item_control">{btnControls}</div>
    </li>
  );
};

export default TodoItem;
