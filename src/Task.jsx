const Task = ({
  task,
  tasks,
  AddItem,
  toggleComplete,
  setTask,
  RemoveItem,
  saveEdit,
  cancelEdit,
  isEdit,
  editValue,
  setEditValue,
  startEdit,
}) => {
  return (
    <div className="todo-container">
      <h1>To-Do list</h1>

      <div className="input-group">
        <input
          className="main-input"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && AddItem()}
          placeholder="Enter a task"
        />
        <button className="add-btn" type="button" onClick={AddItem}>
          Add Task
        </button>
      </div>

      <ul>
        {tasks.map((item) => (
          <li key={item.id} className={item.completed ? "completed" : ""}>
            <div className="task-content">
              <input
                type="checkbox"
                className="task-checkbox"
                checked={item.completed}
                onChange={() => toggleComplete(item.id)}
              />
              {isEdit === item.id ? (
                <input
                  className="inline-edit-input"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(item.id);
                    if (e.key === "Escape") cancelEdit();
                  }}
                  autoFocus
                />
              ) : (
                <span className="task-text">{item.name}</span>
              )}
            </div>
            <div className="task-actions">
              {isEdit === item.id ? (
                <>
                  <button
                    className="btn-save"
                    type="button"
                    onClick={() => saveEdit(item.id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn-cancel"
                    type="button"
                    onClick={() => cancelEdit()}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn-edit"
                    type="button"
                    onClick={() => startEdit(item.id, item.name)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    type="button"
                    onClick={() => RemoveItem(item.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
