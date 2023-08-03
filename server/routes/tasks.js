const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new task
router.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (err) {
    res.status(400).json({ error: "Bad request" });
  }
});

// Update task status
router.patch("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { ...task },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: "Bad request" });
  }
});

// Delete a task
router.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
