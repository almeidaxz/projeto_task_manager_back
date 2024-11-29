const taskRepository = require('../../data/repositories/task/taskRepository');
const errorHandler = require('../../handlers/errors/errors');
const { DatabaseError } = require('pg');

// Serviço para a entidade Task (tarefa). Aqui são chamadas as funções do repositório e validadas as regras de negócio.
class TaskService {
    // Insere uma nova tarefa no banco.
    async createTask(task) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            // Chama o método do repositório responsável por inserir um novo registro no banco.
            const newTask = await taskRepository.createTask(task);
            // Verifica se a tarefa foi criada. Em caso de erro, lança uma exceção que sera tratada no catch.
            if (!newTask) throw new errorHandler.internalError('Erro ao criar tarefa.');
            return { ...responseObject, statusCode: 201, success: true, response: newTask };
        } catch (error) {
            // Adiciona o erro a lista e retorna a resposta ao usuário.
            if (error instanceof DatabaseError) responseObject.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }

    // Busca uma tarefa pelo id da mesma.
    async detailTask(id, user_id) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            // Chama o método do repositório responsável por buscar o detalhamento da tarefa.
            const existingTask = await taskRepository.getTaskById(id, user_id);
            // Verifica se a tarefa foi encontrada. Em caso de erro, lança uma exceção que sera tratada no catch.
            if (!existingTask) throw new errorHandler.notFound('Tarefa não encontrada');
            return { ...responseObject, statusCode: 200, success: true, response: existingTask };
        } catch (error) {
            // Adiciona o erro a lista e retorna a resposta ao usuário.
            if (error instanceof DatabaseError) response.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }

    // Busca uma tarefa pelo id da mesma.
    async updateTask(task, id) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            // Chama o método do repositório responsável por buscar o detalhamento da tarefa.
            const existingTask = await taskRepository.getTaskById(id, task.user_id);
            // Verifica se a tarefa foi encontrada. Em caso de erro, lança uma exceção que sera tratada no catch.
            if (!existingTask) throw new errorHandler.notFound('Tarefa não encontrada');
            // Chama o método do repositório responsável por atualizar o lembrete. Caso erro, lança uma exceção que sera tratada no catch.
            const updatedTask = await taskRepository.updateTask(task, id);
            if (!updatedTask) throw new errorHandler.internalError('Erro ao atualizar tarefa.');
            return { ...responseObject, statusCode: 200, success: true, response: updatedTask };
        } catch (error) {
            // Adiciona o erro a lista e retorna a resposta ao usuário.
            if (error instanceof DatabaseError) response.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }

    // Busca uma tarefa pelo id da mesma.
    async deleteTasks(idsList, user_id) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            // Adiciona os ids das tarefas que foram encontradas na lista de ids à serem excluídas.
            const foundTasks = [];
            const existingTask = await taskRepository.getTaskListById(idsList, user_id);
            for (const task of existingTask) {
                const taskFound = existingTask.find(t => t.id == task.id);
                if (taskFound)
                    foundTasks.push(taskFound.id);
            }
            // Verifica se todos os lembretes foram encontrados. Adiciona uma mensagem de erro informando quais, caso um ou mais não sejam encontrados.
            if (existingTask.length != idsList.length) responseObject.errors.push(`Apenas a(s) tarefa(s) de id ${foundTasks.join(', ')} foi(ram) encontrada(s). Somente essa(s) foi(ram) excluída(s).`);
            // Chama o método do repositório responsável por excluir as tarefas. Em caso de erro, lança uma exceção que será tratada no catch.
            const deletedTasks = await taskRepository.deleteTasks(idsList, user_id);
            if (!deletedTasks.length) throw new errorHandler.internalError('Erro ao deletar uma ou mais tarefas. O estado anterior será retornado.');
            return { ...responseObject, statusCode: 200, success: true, response: deletedTasks };
        } catch (error) {
            // Adiciona o erro à lista e retorna a resposta ao usuário.
            if (error instanceof DatabaseError) responseObject.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject;
        }
    }
}

module.exports = new TaskService();