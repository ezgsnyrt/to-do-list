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

    const taskSchema = new mongoose.Schema({
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
    { timestamps: true }, // Update createdAt and updatedAt automatically
);

const Task = mongoose.model("task", taskSchema);

app.listen(3000, () =>
    console.log("Server is running at http://localhost:3000")
);