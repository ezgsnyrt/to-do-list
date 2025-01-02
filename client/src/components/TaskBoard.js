import React, { useState } from "react";
import "../styles/TaskBoard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPencilAlt,
    faTrash,
    faEllipsisV,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";

const TaskBoard = ({ allTasks }) => {
    const [expandedTaskId, setExpandedTaskId] = useState(null);

    const toggleDropdown = (taskId) => {
        setExpandedTaskId((prevId) => (prevId === taskId ? null : taskId));
    };

    const closeDropdown = () => {
        setExpandedTaskId(null);
    };

    return (
        <div className="task-board">

            {/* All Tasks Column */}
            <div className="task-column all-tasks">
                <h2>All Tasks</h2>
                <ul className="task-list">
                    {allTasks.map((task) => (
                        <li key={task.id} className="task-list-item">
                            <span>{task.title}</span>
                            <div className="task-actions">

                                {/* Edit Icon */}
                                <FontAwesomeIcon
                                    icon={faPencilAlt}
                                    className="icon edit-icon"
                                    title="Edit"
                                    onClick={() =>
                                        console.log(
                                            `Edit the task: ${task.title}`
                                        )
                                    }
                                />

                                {/* Delete Icon */}
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="icon delete-icon"
                                    title="Delete"
                                    onClick={() =>
                                        console.log(
                                            `Delete the task: ${task.title}`
                                        )
                                    }
                                />

                                {/* More Icon */}
                                <div className="task-status-dropdown-container">
                                    <FontAwesomeIcon
                                        icon={faEllipsisV}
                                        className="icon more-icon"
                                        title="For More"
                                        onClick={() => toggleDropdown(task.id)}
                                    />
                                    {expandedTaskId === task.id && (
                                        <div className="task-dropdown">

                                            {/* Exit Button */}
                                            <button
                                                className="dropdown-exit-button"
                                                onClick={closeDropdown}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTimes}
                                                />
                                            </button>
                                            <p>
                                                <strong>Description:</strong>{" "}
                                                {task.description}
                                            </p>
                                            <p>
                                                <strong>Due Date:</strong>{" "}
                                                {new Date(
                                                    task.dueDate
                                                ).toLocaleDateString()}
                                            </p>
                                            <p>
                                                <strong>Priority:</strong>{" "}
                                                {task.priority}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskBoard;