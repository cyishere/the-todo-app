const TodoForm = ({ todo, handleChange, addTodo }) => {
  return (
    <form className="add-control" onSubmit={addTodo}>
      <input
        type="text"
        className="todo"
        value={todo}
        onChange={handleChange}
      />
      <button className="btn primary" type="submit">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
