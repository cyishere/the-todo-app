import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "./todosSlice";

const TodoItem = ({ todo }) => {
  const classes = todo.completed ? "completed" : "";
  const [update, setUpdate] = useState(todo.content);
  const [status, setStatus] = useState("idle");

  const dispatch = useDispatch();

  const handleCancel = () => {
    setStatus("edle");
  };

  const handleUpdateChange = (e) => {
    setStatus("editing");
    setUpdate(e.target.value);
  };

  const saveTodoUpdate = async () => {
    setStatus("idle");
    await dispatch(updateTodo({ ...todo, content: update }));
  };

  const toggleCompleted = async () => {
    const updateInfo = {
      ...todo,
      completed: !todo.completed,
    };
    await dispatch(updateTodo(updateInfo));
  };

  const clickToDelete = async (todoId) => {
    await dispatch(deleteTodo(todoId));
  };

  const btnControls =
    status === "editing" ? (
      <>
        <button className="btn secondary" onClick={saveTodoUpdate}>
          Save
        </button>
        <button className="btn" onClick={handleCancel}>
          Cancel
        </button>
      </>
    ) : (
      <button className="btn text" onClick={() => clickToDelete(todo.id)}>
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
            onClick={toggleCompleted}
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
