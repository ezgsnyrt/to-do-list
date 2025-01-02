import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskBoard from "../components/TaskBoard";

const MainPage = () => {
    const [tasks, setTasks] = useState([
        {
            id: "1",
            title: "Go grocery shopping",
            description: "Buy milk, bread, and eggs.",
            status: "pending",
            priority: "medium",
            dueDate: "2024-12-31T17:00:00Z",
            createdAt: "2024-12-30T12:00:00Z",
            updatedAt: "2024-12-30T12:00:00Z",
        },
        {
            id: "2",
            title: "Create a new Medium Post before the new year",
            description:
                "Write the backend code for a simple to-do list application and turn it into a post.",
            status: "pending",
            priority: "high",
            dueDate: "2024-12-31T23:59:00Z",
            createdAt: "2024-12-30T14:00:00Z",
            updatedAt: "2024-12-30T14:00:00Z",
        },
        {
            id: "3",
            title: "Continue working on the backend course final project",
            description:
                "Perform the final checks on my backend course project and write its documentation.",
            status: "pending",
            priority: "high",
            dueDate: "2025-01-06T23:59:00Z",
            createdAt: "2024-12-30T15:00:00Z",
            updatedAt: "2024-12-30T15:00:00Z",
        },
        {
            id: "4",
            title: "Clean the house",
            description: "Vacuum the living room and clean the kitchen.",
            status: "pending",
            priority: "low",
            dueDate: "2024-12-31T16:00:00Z",
            createdAt: "2024-12-28T10:00:00Z",
            updatedAt: "2024-12-28T10:00:00Z",
        },
        {
            id: "5",
            title: "Water the plants",
            description: "Don’t forget to water the indoor plants.",
            status: "pending",
            priority: "medium",
            dueDate: "2025-01-01T08:00:00Z",
            createdAt: "2024-12-31T08:00:00Z",
            updatedAt: "2024-12-31T08:00:00Z",
        },
        {
            id: "6",
            title: "Pick up laundry",
            description: "Pick up clothes from the dry cleaner.",
            status: "completed",
            priority: "medium",
            dueDate: "2024-12-29T10:00:00Z",
            createdAt: "2024-12-28T11:00:00Z",
            updatedAt: "2024-12-28T11:00:00Z",
        },
    ]);

    const addTask = (newTask) => {
        setTasks((prevTasks) => [
            ...prevTasks,
            {
                // Unique ID for the task
                id: Date.now().toString(),
                title: newTask.name,
                description: newTask.description,
                status: "pending",
                priority: newTask.priority.toLowerCase(),
                dueDate: newTask.dueDate,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        ]);
    };

    return (
        <>
            <TaskForm onSubmit={addTask} />
            <TaskBoard allTasks={tasks} />
        </>
    );
};

export default MainPage;