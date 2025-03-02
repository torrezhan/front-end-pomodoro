import React, { useState } from "react";
import PomodoroTimer from "./PomodoroTimer";

function TaskItem({ task, updateTask, deleteTask, toggleStatus }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleUpdate = () => {
        updateTask(task.id, { ...task, title, description });
        setIsEditing(false);
    };

    const renderTimer = () => {
        if (task.status === "In Progress") {
            return <PomodoroTimer taskId={task.id} />;
        }
        return (
            <div className="task-completed-indicator">
                <span title="Task Completed">✅</span>
                <span className="completed-time">Well done!</span>
            </div>
        );
    };

    const getButtonText = () => {
        return task.status === "In Progress" ? "Completed" : "In Progress";
    };

    return (
        <div className={`task-item ${task.status === "Completed" ? "completed-task" : ""}`}>
            <div className="task-content">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button onClick={handleUpdate}>Save</button>
                    </>
                ) : (
                    <>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <div className="task-controls">
                            <button onClick={() => toggleStatus(task.id)}>
                                {getButtonText()}
                            </button>
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </div>
                    </>
                )}
            </div>
            {renderTimer()}
        </div>
    );
}

export default TaskItem;
