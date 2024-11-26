const { DatabaseError } = require('pg');
const mainRepository = require('../../repositories/main/mainRepository');
const errorHandler = require('../../errors/errors');

class MainService {
    async listTasksAndReminders(user_id) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            const [taskList, reminderList] = await mainRepository.listTasksAndReminders(user_id);
            if (!taskList || !reminderList) throw new errorHandler.internalError('Erro ao listar tarefas e lembretes.');
            return { ...responseObject, statusCode: 200, success: true, response: { tasks: taskList, reminders: reminderList } };
        } catch (error) {
            if (error instanceof DatabaseError) response.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }
}

module.exports = new MainService();