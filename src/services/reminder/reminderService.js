const reminderRepository = require('../../repositorys/reminder/reminderRepository');
const errorHandler = require('../../errors/errors');

class ReminderService {
    async createReminder(reminder) {
        try {
            return await reminderRepository.createReminder(reminder);
        } catch (error) {
            if (error instanceof DatabaseError) throw new errorHandler.dbError("Erro na conexão com o banco de dados.");
        }
    }

    async detailTask(id) {
        try {
            const existingReminder = await reminderRepository.getReminderById(id);
            if (!existingReminder) throw new errorHandler.notFound('Lembrete não encontrado');
            return existingReminder;
        } catch (error) {
            if (error instanceof DatabaseError) throw new errorHandler.dbError("Erro na conexão com o banco de dados.");
        }
    }

    async updateReminder(reminder, id) {
        try {
            const existingReminder = await reminderRepository.getReminderById(id);
            if (!existingReminder) throw new errorHandler.notFound('Lembrete não encontrado');
            return await reminderRepository.updateReminder(reminder, id);
        } catch (error) {
            if (error instanceof DatabaseError) throw new errorHandler.dbError("Erro na conexão com o banco de dados.");
        }
    }

    async deleteUser(id) {
        try {
            const existingReminder = await reminderRepository.getReminderById(id);
            if (!existingReminder) throw new errorHandler.notFound('Lembrete não encontrado');
            return await reminderRepository.deleteReminder(id);
        } catch (error) {
            if (error instanceof DatabaseError) throw new errorHandler.dbError("Erro na conexão com o banco de dados.");
        }
    }
}

module.exports = new ReminderService();