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
      <h1>To-Do List</h1>

      <div className="input-group">
        <input
          className="main-input"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && AddItem()}
          placeholder="What's your focus today?"
        />
        <button className="add-btn" type="button" onClick={AddItem}>
          Add
        </button>
      </div>

      <ul>
        {tasks.map((item, index) => (
          <li 
            key={item.id} 
            className={item.completed ? "completed" : ""}
            style={{ animationDelay: `${index * 50}ms` }}
          >
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
                  onBlur={() => saveEdit(item.id)}
                  autoFocus
                />
              ) : (
                <span className="task-text">{item.name}</span>
              )}
            </div>
            
            <div className="task-actions">
              {isEdit === item.id ? (
                <div className="edit-actions">
                  <button
                    className="btn-small btn-save"
                    type="button"
                    onClick={() => saveEdit(item.id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn-small btn-cancel"
                    type="button"
                    onClick={() => cancelEdit()}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <button
                    className="btn-icon edit"
                    type="button"
                    onClick={() => startEdit(item.id, item.name)}
                    aria-label="Edit Task"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                  </button>
                  <button
                    className="btn-icon delete"
                    type="button"
                    onClick={() => RemoveItem(item.id)}
                    aria-label="Delete Task"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      
      {tasks.length === 0 && (
        <div style={{ textAlign: "center", opacity: 0.5, marginTop: "40px" }}>
          <p>No tasks yet. Enjoy your day!</p>
        </div>
      )}
    </div>
  );
};

export default Task;
