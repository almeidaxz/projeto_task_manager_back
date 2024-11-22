const reminderRepository = require('../../repositories/reminder/reminderRepository');
const { DatabaseError } = require('pg');
const errorHandler = require('../../errors/errors');

class ReminderService {
    async createReminder(reminder) {
        const responseObject = { success: false, errors: [], response: null };
        try {
            const newReminder = await reminderRepository.createReminder(reminder);
            if (!newReminder) throw new errorHandler.internalError('Erro ao criar lembrete.');
            return { ...responseObject, success: true, response: newReminder };
        } catch (error) {
            if (error instanceof DatabaseError) responseObject.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            return responseObject
        }
    }

    async detailReminder(id, user_id) {
        const responseObject = { success: false, errors: [], response: null };
        try {
            const existingReminder = await reminderRepository.getReminderById(id, user_id);
            if (!existingReminder) throw new errorHandler.notFound('Lembrete não encontrado.');
            return { ...responseObject, success: true, response: existingReminder };
        } catch (error) {
            if (error instanceof DatabaseError) responseObject.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            return responseObject
        }
    }

    async updateReminder(reminder, id) {
        const responseObject = { success: false, errors: [], response: null };
        try {
            const existingReminder = await reminderRepository.getReminderById(id, reminder.user_id);
            if (!existingReminder) throw new errorHandler.notFound('Lembrete não encontrada');
            const updatedReminder = await reminderRepository.updateReminder(reminder, id);
            if (!updatedReminder) throw new errorHandler.internalError('Erro ao atualizar lembrete.');
            return { ...responseObject, success: true, response: updatedReminder };
        } catch (error) {
            if (error instanceof DatabaseError) responseObject.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            return responseObject
        }
    }

    async deleteReminder(id, user_id) {
        const responseObject = { success: false, errors: [], response: null };
        try {
            const existingReminder = await reminderRepository.getReminderById(id, user_id);
            if (!existingReminder) throw new errorHandler.notFound('Tarefa não encontrada');
            const deletedReminder = await reminderRepository.deleteReminder(id, user_id);
            if (!deletedReminder) throw new errorHandler.internalError('Erro ao deletar tarefa.');
            return { ...responseObject, success: true, response: deletedReminder };
        } catch (error) {
            if (error instanceof DatabaseError) responseObject.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            return responseObject
        }
    }
}

module.exports = new ReminderService();