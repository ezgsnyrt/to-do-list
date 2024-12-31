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

app.listen(3000, () =>
    console.log("Server is running at http://localhost:3000")
);