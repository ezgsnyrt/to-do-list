import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

mongoose
    .connect("mongodb://localhost:27017/mynewdatabase")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        dueDate: {
            type: Date,
        },
    },
    { timestamps: true } // Update createdAt and updatedAt automatically
);

const Task = mongoose.model("task", taskSchema);

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/tasks", async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).json({ error: "Title is required" });
        }

        const newTask = new Task(req.body);
        await newTask.save();

        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(id, req.body);

        if (!updatedTask) {
            return res.status(404).json({ error: "Task cannot be found!" });
        }

        res.json({
            message: "Task has been updated successfully!",
            updatedTask,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ error: "Task cannot be found!" });
        }

        res.json({
            message: "Task has been deleted successfully!",
            deletedTask,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () =>
    console.log("Server is running at http://localhost:3000")
);