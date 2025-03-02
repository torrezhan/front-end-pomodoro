import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, updateTask, deleteTask, toggleStatus }) {
    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                    toggleStatus={toggleStatus}
                />
            ))}
        </div>
    );
}

export default TaskList;
