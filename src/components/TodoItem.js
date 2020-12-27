const TodoItem = ({
  todo,
  deleteTodo,
  toggleCompleted,
  handleChange,
  updateTodo,
}) => {
  const classes = todo.completed ? "completed" : "";

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
          value={todo.content}
          onChange={handleChange}
          disabled={todo.completed}
        />
      </div>

      <div className="todo-item_control">
        <button className="btn secondary" onClick={updateTodo}>
          Edit
        </button>
        <button className="btn text" onClick={() => deleteTodo(todo.id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
