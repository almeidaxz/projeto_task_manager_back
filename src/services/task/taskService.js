const taskRepository = require('../../repositories/task/taskRepository');
const errorHandler = require('../../errors/errors');
const { DatabaseError } = require('pg');

class TaskService {
    async createTask(task) {
        const responseObject = { success: false, errors: [], response: null };
        try {
            const newTask = await taskRepository.createTask(task);
            if (!newTask) throw new errorHandler.internalError('Erro ao criar tarefa.');
            return { ...responseObject, success: true, response: newTask };
        } catch (error) {
            if (error instanceof DatabaseError) responseObject.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            return responseObject
        }
    }

    async detailTask(id) {
        const responseObject = { success: false, errors: [], response: null };
        try {
            const existingTask = await taskRepository.getTaskById(id);
            if (!existingTask) throw new errorHandler.notFound('Tarefa não encontrada');
            return { ...responseObject, success: true, response: existingTask };
        } catch (error) {
            if (error instanceof DatabaseError) response.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            return responseObject
        }
    }

    async updateTask(task, id) {
        const responseObject = { success: false, errors: [], response: null };
        try {
            const existingTask = await taskRepository.getTaskById(id);
            if (!existingTask) throw new errorHandler.notFound('Tarefa não encontrada');
            const updatedTask = await taskRepository.updateTask(task, id);
            if (!updatedTask) throw new errorHandler.internalError('Erro ao atualizar tarefa.');
            return { ...responseObject, success: true, response: updatedTask };
        } catch (error) {
            if (error instanceof DatabaseError) response.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            return responseObject
        }
    }

    async deleteTask(id) {
        const responseObject = { success: false, errors: [], response: null };
        try {
            const existingTask = await taskRepository.getTaskById(id);
            if (!existingTask) throw new errorHandler.notFound('Tarefa não encontrada');
            const deletedTask = await taskRepository.deleteTask(id);
            if (!deletedTask) throw new errorHandler.internalError('Erro ao deletar tarefa.');
            return { ...responseObject, success: true, response: deletedTask };
        } catch (error) {
            if (error instanceof DatabaseError) responseObject.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            return responseObject;
        }
    }
}

module.exports = new TaskService();