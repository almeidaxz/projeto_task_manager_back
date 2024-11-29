const reminderRepository = require('../../repositories/reminder/reminderRepository');
const { DatabaseError } = require('pg');
const errorHandler = require('../../errors/errors');

// Serviço para a entidade Reminder (lembrete). Aqui são chamadas as funções do repositório e validadas as regras de negócio.
class ReminderService {
    // Insere um novo lembrete no banco.
    async createReminder(reminder) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            // Chama o método do repositório responsável por inserir um novo registro no banco.
            const newReminder = await reminderRepository.createReminder(reminder);
            // Verifica se o lembrete foi criado. Em caso de erro, lança uma exceção que será tratada no catch.
            if (!newReminder) throw new errorHandler.internalError('Erro ao criar lembrete.');
            return { ...responseObject, statusCode: 201, success: true, response: newReminder };
        } catch (error) {
            // Adiciona o erro à lista e retorna a resposta ao usuário.
            if (error instanceof DatabaseError) responseObject.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }

    // Busca um lembrete de um determinado usuário pelo id do lembrete.
    async detailReminder(id, user_id) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            // Chama o método do repositório responsável por buscar o detalhamento do lembrete.
            const existingReminder = await reminderRepository.getReminderById(id, user_id);
            // Verifica se o lembrete existe. Caso não, lança uma exceção que será tratada no catch.
            if (!existingReminder) throw new errorHandler.notFound('Lembrete não encontrado.');
            return { ...responseObject, statusCode: 200, success: true, response: existingReminder };
        } catch (error) {
            // Adiciona o erro à lista e retorna a resposta ao usuário.
            if (error instanceof DatabaseError) responseObject.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }

    // Atualiza um lembrete a partir do seu id id.
    async updateReminder(reminder, id) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            // Chama o método do repositório responsável por buscar o detalhamento do lembrete.
            const existingReminder = await reminderRepository.getReminderById(id, reminder.user_id);
            // Verifica se o lembrete existe. Em caso de erro, lança uma exceção que será tratada no catch.
            if (!existingReminder) throw new errorHandler.notFound('Lembrete não encontrada');
            // Chama o método do repositório responsável por atualizar o lembrete. Caso erro, lança uma exceção que será tratada no catch.
            const updatedReminder = await reminderRepository.updateReminder(reminder, id);
            if (!updatedReminder) throw new errorHandler.internalError('Erro ao atualizar lembrete.');
            return { ...responseObject, statusCode: 200, success: true, response: updatedReminder };
        } catch (error) {
            // Adiciona o erro à lista e retorna a resposta ao usuário.
            if (error instanceof DatabaseError) responseObject.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }

    // Exclui um ou mais lembretes.
    async deleteReminders(idsList, user_id) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            // Chama o método do repositório responsável por buscar a lista de lembretes. Adiciona os ids que foram encontrados na lista de ids à serem excluídos.
            const foundReminders = [];
            const existingReminders = await reminderRepository.getReminderListById(idsList, user_id);
            for (const reminder of existingReminders) {
                const reminderFound = existingReminders.find(t => t.id == reminder.id);
                if (reminderFound)
                    foundReminders.push(reminderFound.id);
            }
            // Verifica se todos os lembretes foram encontrados. Adiciona uma mensagem de erro informando quais, caso um ou mais não sejam encontrados.
            if (existingReminders.length != idsList.length) responseObject.errors.push(`Apenas o(s) lembretes(s) de id ${foundReminders.join(', ')} foi(ram) encontrada(s). Somente esse(s) foi(ram) excluído(s).`);
            // Chama o método do repositório responsável por excluir os lembretes.
            const deletedReminders = await reminderRepository.deleteReminders(idsList, user_id);
            // Verifica se a operação foi bem sucedida. Em caso de erro, lança uma exceção que será tratada no catch.
            if (!deletedReminders.length) throw new errorHandler.internalError('Erro ao deletar um ou mais lembretes. O estado anterior será retornado.');
            return { ...responseObject, statusCode: 200, success: true, response: deletedReminders };
        } catch (error) {
            // Adiciona o erro à lista e retorna a resposta ao usuário.
            if (error instanceof DatabaseError) responseObject.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject;
        }
    }
}

module.exports = new ReminderService();