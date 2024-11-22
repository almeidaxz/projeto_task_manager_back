const e = require('cors');
const taskService = require('../../services/task/taskService');

class TaskController {
    async createTask(req, res) {
        // const user_id = req.user.id
        const user_id = 1
        const { name, description, categories, due_date, due_time } = req.body;
        try {
            const task = await taskService.createTask({ name, description, categories, due_date, due_time, user_id });
            return res.status(201).json(task);
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }

    async updateTask(req, res) {
        const { id } = req.params;
        const { user_id, name, description, categories, due_date, due_time } = req.body;
        try {
            const task = await taskService.updateTask({ user_id, name, description, categories, due_date, due_time }, id);
            return res.status(200).json(task);
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }

    async detailTask(req, res) {
        const { id } = req.params;
        try {
            const task = await taskService.detailTask(id);
            return res.status(200).json(task);
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }

    async deleteTask(req, res) {
        const { id } = req.params;
        try {
            const task = await taskService.deleteTask(id);
            return res.status(200).json(task);
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }
}

module.exports = new TaskController();