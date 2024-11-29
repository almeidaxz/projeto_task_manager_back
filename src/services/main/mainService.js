const { DatabaseError } = require('pg');
const mainRepository = require('../../data/repositories/main/mainRepository');
const errorHandler = require('../../handlers/errors/errors');

// Serviço para a entidade Main (que representa a home da aplicação). Aqui são chamadas as funções do repositório e validadas as regras de negócio.
class MainService {
    // Busca as tarefas e lembretes de um determinado usuário.
    async listTasksAndReminders(user_id) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            // Aguarda a resposta do repositório, utilizando Promise.all para aguardar ambas as respostas.
            const [taskList, reminderList] = await mainRepository.listTasksAndReminders(user_id);
            if (!taskList || !reminderList) throw new errorHandler.internalError('Erro ao listar tarefas e lembretes.');
            return { ...responseObject, statusCode: 200, success: true, response: { tasks: taskList, reminders: reminderList } };
        } catch (error) {
            // Adiciona o erro à lista e retorna a resposta ao usuário.
            if (error instanceof DatabaseError) response.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }
}

module.exports = new MainService();