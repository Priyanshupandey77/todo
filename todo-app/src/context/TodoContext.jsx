import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, logout } = useAuth();

  useEffect(() => {
    if (token) {
      fetchTodos();
    }
  }, [token]);

  async function fetchTodos() {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("https://todo-q4tx.onrender.com/api/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        logout();
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await res.json();
      setTodos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function addTodo(text) {
    try {
      const res = await fetch("https://todo-q4tx.onrender.com/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }

      const newTodo = await res.json();

      setTodos((prev) => [...prev, newTodo]);
    } catch (error) {
      setError(error.message);
    }
  }

  async function deleteTodo(id) {
    try {
      await fetch(`https://todo-q4tx.onrender.com/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      setError(error.message);
    }
  }

  async function toggleTodo(id) {
    const todo = todos.find((t) => t._id === id);
    if (!todo) {
      return;
    }
    try {
      await fetch(`https://todo-q4tx.onrender.com/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      setTodos((prev) =>
        prev.map((t) => (t._id === id ? { ...t, completed: !t.completed } : t)),
      );
    } catch (error) {
      setError(error.message);
    }
  }

  function startEditing(todo) {
    setEditingId(todo._id);
    setEditText(todo.text);
  }

  async function editTodo() {
    try {
      await fetch(`https://todo-q4tx.onrender.com/api/todos/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: editText }),
      });

      setTodos((prev) =>
        prev.map((t) => (t._id === editingId ? { ...t, text: editText } : t)),
      );

      setEditingId(null);
      setEditText("");
    } catch (error) {
      setError(error.message);
    }
  }

  async function clearCompleted() {
    try {
      await fetch("https://todo-q4tx.onrender.com/api/todos/completed", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos((prev) => prev.filter((t) => !t.completed));
    } catch (error) {
      setError(error.message);
    }
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const value = {
    todos: filteredTodos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    startEditing,
    editingId,
    editText,
    setEditText,
    setEditingId,
    filter,
    setFilter,
    clearCompleted,
    activeCount: todos.filter((t) => !t.completed).length,
    completedCount: todos.filter((t) => t.completed).length,

    loading,
    error,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  return useContext(TodoContext);
}
