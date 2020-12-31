import { useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, setTodos }) => {
  const [showClosed, setShowClosed] = useState(false);

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
    </main>
  );
};

export default TodoList;
