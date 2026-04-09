import { createContext, useContext, useState, useEffect } from "react";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const res = await fetch("http://localhost:5000/api/todos");
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addTodo(text) {
    try {
      const res = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      await fetchTodos();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
      });

      await fetchTodos();
    } catch (error) {
      console.log(error);
    }
  }

  async function toggleTodo(id) {
    const todo = todos.find((t) => t._id === id);
    if (!todo) return;
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      await fetchTodos();
    } catch (error) {
      console.log(error);
    }
  }

  function startEditing(todo) {
    setEditingId(todo._id);
    setEditText(todo.text);
  }

  async function editTodo() {
    try {
      await fetch(`http://localhost:5000/api/todos/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: editText }),
      });

      await fetchTodos();

      setEditingId(null);
      setEditText("");
    } catch (error) {
      console.log(error);
    }
  }

  async function clearCompleted() {
    try {
      await fetch("http://localhost:5000/api/todos/completed", {
        method: "DELETE",
      });

      await fetchTodos();
    } catch (error) {
      console.log(error);
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
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  return useContext(TodoContext);
}
