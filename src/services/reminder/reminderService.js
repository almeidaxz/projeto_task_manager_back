const reminderRepository = require('../../repositorys/reminder/reminderRepository');
const errorHandler = require('../../errors/errors');

class ReminderService {
    async createReminder(reminder) {
        return reminderRepository.createReminder(reminder);
    }

    async detailTask(id) {
        const existingReminder = await reminderRepository.getReminderById(id);
        if (!existingReminder) errorHandler.notFound('Lembrete não encontrado');
        return existingReminder;
    }

    async updateReminder(reminder, id) {
        const existingReminder = await reminderRepository.getReminderById(id);
        if (!existingReminder) errorHandler.notFound('Lembrete não encontrado');
        return await reminderRepository.updateReminder(reminder, id);
    }

    async deleteUser(id) {
        const existingReminder = await reminderRepository.getReminderById(id);
        if (!existingReminder) errorHandler.notFound('Lembrete não encontrado');
        return await reminderRepository.deleteReminder(id);
    }
}

module.exports = new ReminderService();