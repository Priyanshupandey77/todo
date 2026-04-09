import { useTodos } from "../context/TodoContext";

export default function TodoItem({ todo }) {
  const {
    deleteTodo,
    toggleTodo,
    editTodo,
    startEditing,
    editingId,
    editText,
    setEditText,
    setEditingId,
  } = useTodos();

  if (editingId === todo.id) {
    return (
      <li className={`todo-item ${editingId === todo.id ? "editing" : ""}`}>
        <input
          className="todo-edit-input"
          autoFocus
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
        <div className="todo-edit-actions">
          <button className="btn-save" onClick={editTodo}>
            Save
          </button>
          <button className="btn-cancel" onClick={() => setEditingId(null)}>
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className={`todo-item ${todo.completed ? "todo-item--completed" : ""}`}>
      <label className="checkbox-wrapper">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <span className="checkmark"></span>
        <span
          className={
            todo.completed
              ? "todo-item__text completed-text"
              : "todo-item__text"
          }
        >
          {todo.text}
        </span>
      </label>

      <div className="todo-item__actions">
        <button className="btn-edit" onClick={() => startEditing(todo)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => deleteTodo(todo.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
