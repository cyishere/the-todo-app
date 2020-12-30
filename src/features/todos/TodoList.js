import { useEffect, useState } from "react";
import { getAllTodos, selectAllTodos } from "./todosSlice";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";

const TodoList = () => {
  const [showClosed, setShowClosed] = useState(false);

  const todos = useSelector(selectAllTodos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  const unCompletedTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const showClosedTodos = () => {
    setShowClosed(!showClosed);
  };

  return (
    <main>
      <div className="todo-list">
        {unCompletedTodos.length < 1 ? (
          <p className="todo-item">Loading...</p>
        ) : (
          <ul>
            {unCompletedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
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
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </ul>
          )}
        </div>
      )}
    </main>
  );
};

export default TodoList;
