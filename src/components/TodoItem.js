import { useState } from "react";
import { updateTodoService } from "../services/todoServices";

const TodoItem = ({ todo, deleteTodo, toggleCompleted }) => {
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
