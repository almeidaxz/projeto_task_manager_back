const taskService = require('../../services/task/taskService');

class TaskController {
    async createTask(req, res) {
        try {
            const { name, description, category, date, time } = req.body;
            taskService.createTask({ name, description, category, date, time });
            return res.status(201).json();
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async updateTask(req, res) {
        try {
            const { id } = req.params;
            const { name, description, category, date, time } = req.body;
            taskService.updateTask({ id, name, description, category, date, time }, id);
            return res.status(204).json();
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async detailTask(req, res) {
        try {
            const { id } = req.params;
            const task = await taskService.detailTask(id);
            return res.status(200).json(task);
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async deleteTask(req, res) {
        try {
            const { id } = req.params;
            taskService.deleteTask(id);
            return res.status(204).json();
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }
}

module.exports = new TaskController();