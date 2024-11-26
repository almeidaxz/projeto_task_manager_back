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


    async deleteReminders(idsList, user_id) {
        const responseObject = { success: false, errors: [], response: null };
        try {
            const foundReminders = [];
            const existingReminders = await reminderRepository.getReminderListById(idsList, user_id);
            for (const reminder of existingReminders) {
                const reminderFound = existingReminders.find(t => t.id == reminder.id);
                if (reminderFound)
                    foundReminders.push(reminderFound.id);
            }
            if (existingReminders.length != idsList.length) responseObject.errors.push(`Apenas o(s) lembretes(s) de id ${foundReminders.join(', ')} foi(ram) encontrada(s). Somente esse(s) foi(ram) excluído(s).`);
            const deletedReminders = await reminderRepository.deleteReminders(idsList, user_id);
            if (!deletedReminders.length) throw new errorHandler.internalError('Erro ao deletar um ou mais lembretes. O estado anterior será retornado.');
            return { ...responseObject, success: true, response: deletedReminders };
        } catch (error) {
            if (error instanceof DatabaseError) responseObject.errors.push("Erro na conexão com o banco de dados.");
            console.log(error)
            responseObject.errors.push(error.message);
            return responseObject;
        }
    }
}

module.exports = new ReminderService();