import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { useTodos } from "./context/TodoContext";
import { useAuth } from "./context/AuthContext.jsx";
import Login from "./pages/Login";

export default function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { token, logout } = useAuth();

  const {
    filter,
    setFilter,
    clearCompleted,
    activeCount,
    completedCount,
    loading,
    error,
  } = useTodos();

  if (!token) {
    return <Login />;
  }

  return (
    <div className={`container ${theme}`}>
      <div className="todo-box">
        <h1>Todo App</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </button>
        <TodoInput />
        <div className="filters">
          <button
            className={`btn-all ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`btn-active ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`btn-completed ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button className="btn-clear" onClick={clearCompleted}>
            Clear Completed
          </button>
        </div>
        <div className="todo-stats">
          <div className="todo-stats__item">Active: {activeCount}</div>
          <div className="todo-stats__item">Completed: {completedCount}</div>
        </div>
        {loading && (
          <p style={{ color: "yellow" }}>
            {" "}
            <b>Loading...</b>{" "}
          </p>
        )}
        {error && (
          <p style={{ color: "red" }}>
            <b>{error}</b>
          </p>
        )}

        <TodoList />
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
