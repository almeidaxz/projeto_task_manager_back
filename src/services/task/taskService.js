const taskRepository = require('../../repositorys/task/taskRepository');
const errorHandler = require('../../errors/errors');

class TaskService {
    async createTask(task, user_id) {
        try {
            return taskRepository.createTask(task, user_id);
        } catch (error) {
            if (error instanceof DatabaseError) throw new errorHandler.dbError("Erro na conexão com o banco de dados.");
        }
    }

    async detailTask(id) {
        try {
            const existingTask = await taskRepository.getTaskById(id);
            if (!existingTask) throw new errorHandler.notFound('Tarefa não encontrada');
            return existingTask;
        } catch (error) {
            if (error instanceof DatabaseError) throw new errorHandler.dbError("Erro na conexão com o banco de dados.");
        }
    }

    async updateTask(task, id) {
        try {
            const existingTask = await taskRepository.getTaskById(id);
            if (!existingTask) throw new errorHandler.notFound('Tarefa não encontrada');
            return await taskRepository.updateTask(task, id);
        } catch (error) {
            if (error instanceof DatabaseError) throw new errorHandler.dbError("Erro na conexão com o banco de dados.");
        }
    }

    async deleteUser(id) {
        try {
            const existingTask = await taskRepository.getTaskById(id);
            if (!existingTask) throw new errorHandler.notFound('Tarefa não encontrada');
            return await taskRepository.deleteTask(id);
        } catch (error) {
            if (error instanceof DatabaseError) throw new errorHandler.dbError("Erro na conexão com o banco de dados.");
        }
    }
}

module.exports = new TaskService();