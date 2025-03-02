import React from "react";

function TaskFilters({ filter, setFilter }) {
    return (
        <div className="task-filters">
            <button onClick={() => setFilter("All")}>All</button>
            <button onClick={() => setFilter("In Progress")}>In Progress</button>
            <button onClick={() => setFilter("Completed")}>Completed</button>
        </div>
    );
}

export default TaskFilters;
