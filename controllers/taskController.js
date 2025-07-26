// controllers/taskController.js
import Task from '../models/Task.js';

// Create a new task
const createTask = async (req, res) => {
  const { title } = req.body;
  try {
    const task = await Task.create({ title, user: req.user });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task', error: err.message });
  }
};

// Get all tasks for the authenticated user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    // Build update object dynamically to allow partial updates
    const update = {};
    if (title !== undefined) update.title = title;
    if (completed !== undefined) update.completed = completed;
    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user },
      // { title },
       update,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, user: req.user });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
};


export { createTask, getTasks, updateTask, deleteTask };