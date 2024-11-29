const reminderService = require('../../services/reminder/reminderService');

// Controlador para a entidade Reminder (lembrete). Aqui são chamadas as funções do serviço.
class ReminderController {
    // Responde com o novo lembrete criado ou um erro.
    async createReminder(req, res) {
        const reminder = req.body;
        try {
            const newReminder = await reminderService.createReminder(reminder);
            return res.status(201).json(newReminder);
        } catch (error) {
            return res.status(error.statusCode).json(error.message);
        }
    }

    // Responde com o lembrete atualizado ou um erro.
    async updateReminder(req, res) {
        const { id } = req.params;
        const reminder = req.body;
        try {
            const updatedReminder = await reminderService.updateReminder(reminder, id);
            return res.status(200).json(updatedReminder);
        } catch (error) {
            return res.status(error.statusCode).json(error.message);
        }
    }

    // Responde com o lembrete ou um erro.
    async detailReminder(req, res) {
        const { id } = req.params;
        const user_id = req.user.id;
        try {
            const reminder = await reminderService.detailReminder(id, user_id);
            return res.status(200).json(reminder);
        } catch (error) {
            return res.status(error.statusCode).json(error.message);
        }
    }

    // Responde com a lista de lembretes excluídos ou um erro.
    async deleteReminder(req, res) {
        const user_id = req.user.id;
        const query = req.query;
        const idList = [];

        for (const [key, value] of Object.entries(query)) {
            idList.push(value);
        }

        try {
            const reminder = await reminderService.deleteReminders(idList, user_id);
            return res.status(200).json(reminder);
        } catch (error) {
            return res.status(error.statusCode).json(error.message);
        }
    }
}

module.exports = new ReminderController();