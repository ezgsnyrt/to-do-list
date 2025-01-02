import React from "react";
import "../styles/TaskBoard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPencilAlt,
    faTrash,
    faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

const TaskBoard = ({ allTasks }) => {
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
                                    className="icon"
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
                                    className="icon"
                                    title="Delete"
                                    onClick={() =>
                                        console.log(
                                            `Delete the task: ${task.title}`
                                        )
                                    }
                                />

                                {/* For More */}
                                <div className="task-status-dropdown-container">
                                    <FontAwesomeIcon
                                        icon={faEllipsisV}
                                        className="icon"
                                        title="For More"
                                        onClick={() =>
                                            console.log(
                                                `See details of the task: ${task.title}`
                                            )
                                        }
                                    />
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