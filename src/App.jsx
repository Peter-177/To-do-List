import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Task from "./Task";
function App() {
  const saveTasks = localStorage.getItem("tasks");
  const defaultTask = saveTasks ? JSON.parse(saveTasks) : [];

  const [tasks, setTasks] = useState(defaultTask);
  const [task, setTask] = useState("");
  const [isEdit, setIsEdit] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const RemoveItem = (id) => {
    const DeleteItem = tasks.filter((task) => task.id !== id);
    setTasks(DeleteItem);
  };
  const AddItem = () => {
    if (task.trim() === "") return;
    const newItem = {
      name: task,
      id: nanoid(),
      completed: false,
    };
    setTasks([...tasks, newItem]);
    setTask("");
  };

  const toggleComplete = (id) => {
    const checkbox = tasks.map((task) => {
      return task.id === id ? { ...task, completed: !task.completed } : task;
    });
    setTasks(checkbox);
  };

  const startEdit = (id, name) => {
    setIsEdit(id);
    setEditValue(name);
  };

  const saveEdit = (id) => {
    if (editValue.trim() === "") return;

    const updateItem = tasks.map((task) => {
      return task.id === id ? { ...task, name: editValue } : task;
    });
    setTasks(updateItem);
    setIsEdit(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditValue("");
    setIsEdit(null);
  };

  return (
    <section>
      <Task
        AddItem={AddItem}
        toggleComplete={toggleComplete}
        task={task}
        tasks={tasks}
        setTask={setTask}
        RemoveItem={RemoveItem}
        startEdit={startEdit}
        saveEdit={saveEdit}
        cancelEdit={cancelEdit}
        isEdit={isEdit}
        editValue={editValue}
        setEditValue={setEditValue}
      />
    </section>
  );
}

export default App;
