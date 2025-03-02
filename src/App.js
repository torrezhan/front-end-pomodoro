import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import ThemeToggle from "./components/ThemeToggle";
import "./styles/App.css";

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("All");

    const addTask = (task) => {
        setTasks([...tasks, { ...task, id: Date.now(), status: "In Progress" }]);
    };

    const updateTask = (id, updatedTask) => {
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const toggleStatus = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id
                    ? { ...task, status: task.status === "Completed" ? "In Progress" : "Completed" }
                    : task
            )
        );
    };

    const filteredTasks = tasks.filter(
        (task) => filter === "All" || task.status === filter
    );

    return (
        <div className="app">
            <h1>Task Manager</h1>
            <ThemeToggle />
            <TaskForm addTask={addTask} />
            <TaskFilters setFilter={setFilter} />
            <TaskList
                tasks={filteredTasks}
                updateTask={updateTask}
                deleteTask={deleteTask}
                toggleStatus={toggleStatus}
            />
        </div>
    );
}

export default App;
