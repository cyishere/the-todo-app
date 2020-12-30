import "./App.css";
import Header from "./components/Header";
import TodoForm from "./features/todos/TodoForm";
import TodoList from "./features/todos/TodoList";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="container">
      <Header />

      <TodoForm />

      <TodoList />

      <Footer />
    </div>
  );
};

export default App;
