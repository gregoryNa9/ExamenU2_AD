const Task = require("../models/task");

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({ title, description, user: req.userId });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.userId });
        if (!task) return res.status(404).json({ message: "Tarea no encontrada o sin permisos" });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.userId });
        if (!task) return res.status(404).json({ message: "Tarea no encontrada o sin permisos" });
        Object.assign(task, req.body);
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
        if (!task) return res.status(404).json({ message: "Tarea no encontrada o sin permisos" });
        res.json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};