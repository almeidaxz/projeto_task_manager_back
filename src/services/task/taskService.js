const taskRepository = require('../../repositorys/task/taskRepository');
const errorHandler = require('../../errors/errors');

class TaskService {
    async createTask(task) {
        return taskRepository.createTask(task);
    }

    async detailTask(id) {
        const existingTask = await taskRepository.getTaskById(id);
        if (!existingTask) errorHandler.notFound('Tarefa não encontrada');
        return existingTask;
    }

    async updateTask(task, id) {
        const existingTask = await taskRepository.getTaskById(id);
        if (!existingTask) errorHandler.notFound('Tarefa não encontrada');
        return await taskRepository.updateTask(task, id);
    }

    async deleteUser(id) {
        const existingTask = await taskRepository.getTaskById(id);
        if (!existingTask) errorHandler.notFound('Tarefa não encontrada');
        return await taskRepository.deleteTask(id);
    }
}

module.exports = new TaskService();