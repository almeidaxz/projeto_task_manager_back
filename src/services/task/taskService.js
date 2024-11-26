const taskRepository = require('../../repositories/task/taskRepository');
const errorHandler = require('../../errors/errors');
const { DatabaseError } = require('pg');

class TaskService {
    async createTask(task) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            const newTask = await taskRepository.createTask(task);
            if (!newTask) throw new errorHandler.internalError('Erro ao criar tarefa.');
            return { ...responseObject, statusCode: 201, success: true, response: newTask };
        } catch (error) {
            if (error instanceof DatabaseError) responseObject.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }

    async detailTask(id, user_id) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            const existingTask = await taskRepository.getTaskById(id, user_id);
            if (!existingTask) throw new errorHandler.notFound('Tarefa não encontrada');
            return { ...responseObject, statusCode: 200, success: true, response: existingTask };
        } catch (error) {
            if (error instanceof DatabaseError) response.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }

    async updateTask(task, id) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            const existingTask = await taskRepository.getTaskById(id, task.user_id);
            if (!existingTask) throw new errorHandler.notFound('Tarefa não encontrada');
            const updatedTask = await taskRepository.updateTask(task, id);
            if (!updatedTask) throw new errorHandler.internalError('Erro ao atualizar tarefa.');
            return { ...responseObject, statusCode: 200, success: true, response: updatedTask };
        } catch (error) {
            if (error instanceof DatabaseError) response.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }

    async deleteTasks(idsList, user_id) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            const foundTasks = [];
            const existingTask = await taskRepository.getTaskListById(idsList, user_id);
            for (const task of existingTask) {
                const taskFound = existingTask.find(t => t.id == task.id);
                if (taskFound)
                    foundTasks.push(taskFound.id);
            }
            if (existingTask.length != idsList.length) responseObject.errors.push(`Apenas a(s) tarefa(s) de id ${foundTasks.join(', ')} foi(ram) encontrada(s). Somente essa(s) foi(ram) excluída(s).`);
            const deletedTasks = await taskRepository.deleteTasks(idsList, user_id);
            if (!deletedTasks.length) throw new errorHandler.internalError('Erro ao deletar uma ou mais tarefas. O estado anterior será retornado.');
            return { ...responseObject, statusCode: 200, success: true, response: deletedTasks };
        } catch (error) {
            if (error instanceof DatabaseError) responseObject.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject;
        }
    }
}

module.exports = new TaskService();