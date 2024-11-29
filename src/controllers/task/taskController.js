const e = require('cors');
const taskService = require('../../services/task/taskService');

// Controlador para a entidade Task (tarefa). Aqui são chamadas as funções do serviço.
class TaskController {
    // Responde com a nova tarefa criada ou um erro.
    async createTask(req, res) {
        const user_id = req.user.id;
        const { name, description, categories, due_date, due_time } = req.body;
        try {
            const task = await taskService.createTask({ name, description, categories, due_date, due_time, user_id });
            return res.status(201).json(task);
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }

    // Responde com a tarefa atualizada ou um erro.
    async updateTask(req, res) {
        const { id } = req.params;
        const { user_id, name, description, categories, due_date, due_time, is_done } = req.body;
        try {
            const task = await taskService.updateTask({ user_id, name, description, categories, due_date, due_time, is_done }, id);
            return res.status(200).json(task);
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }

    // Responde com a tarefa ou um erro.
    async detailTask(req, res) {
        const { id } = req.params;
        const user_id = req.user.id;
        try {
            const task = await taskService.detailTask(id, user_id);
            return res.status(200).json(task);
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }

    // Responde com a lista de tarefas excluídas ou um erro.
    async deleteTask(req, res) {
        const user_id = req.user.id;
        const query = req.query;
        const idList = [];

        for (const [key, value] of Object.entries(query)) {
            idList.push(value);
        }

        try {
            const task = await taskService.deleteTasks(idList, user_id);
            return res.status(200).json(task);
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }
}

module.exports = new TaskController();