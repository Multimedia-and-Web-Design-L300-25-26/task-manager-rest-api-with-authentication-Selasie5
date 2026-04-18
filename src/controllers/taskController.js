import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, owner: req.user._id });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    if (!task) return res.status(404).json({ error: "Task not found or not authorized" });
    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
