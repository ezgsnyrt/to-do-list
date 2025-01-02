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
    const [tasks, setTasks] = useState(allTasks);
    const [expandedTaskId, setExpandedTaskId] = useState(null);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTaskTitle, setEditedTaskTitle] = useState("");

    // Sort tasks from high to low priority
    const sortedTasks = [...tasks].sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    const toggleDropdown = (taskId) => {
        setExpandedTaskId((prevId) => (prevId === taskId ? null : taskId));
    };

    const closeDropdown = () => {
        setExpandedTaskId(null);
    };

    // Edit the task when edit-icon is clicked
    const startEditing = (taskId, currentTitle) => {
        setEditingTaskId(taskId);
        setEditedTaskTitle(currentTitle);
    };

    // Save the edited task title and exit editing mode
    const saveTaskName = () => {
        if (editingTaskId) {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === editingTaskId
                        ? { ...task, title: editedTaskTitle }
                        : task
                )
            );
            setEditingTaskId(null);
            setEditedTaskTitle("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            saveTaskName();
        }
    };

    // Delete the task when delete-icon is clicked
    const deleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    return (
        <div className="task-board">

            {/* All Tasks Column */}
            <div className="task-column all-tasks">
                <h2>All Tasks</h2>
                <ul className="task-list">
                    {sortedTasks.map((task) => (
                        <li
                            key={task.id}
                            className={`task-list-item ${task.priority}-priority`}
                        >
                            {editingTaskId === task.id ? (
                                <input
                                    type="text"
                                    value={editedTaskTitle}
                                    onChange={(e) =>
                                        setEditedTaskTitle(e.target.value)
                                    }
                                    onKeyDown={handleKeyDown}
                                    onBlur={saveTaskName}
                                    className="edit-task-input"
                                />
                            ) : (
                                <span>{task.title}</span>
                            )}
                            <div className="task-actions">

                                {/* Edit Icon */}
                                <FontAwesomeIcon
                                    icon={faPencilAlt}
                                    className="icon edit-icon"
                                    title="Edit"
                                    onClick={() =>
                                        startEditing(task.id, task.title)
                                    }
                                />

                                {/* Delete Icon */}
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="icon delete-icon"
                                    title="Delete"
                                    onClick={() => deleteTask(task.id)}
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