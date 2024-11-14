const reminderService = require('../../services/reminder/reminderService');

class ReminderService {
    async createReminder(req, res) {
        try {
            const { name, description, date, time } = req.body;
            reminderService.createReminder({ name, description, date, time });
            return res.status(201).json();
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async updateReminder(req, res) {
        try {
            const { id } = req.params;
            const { name, description, date, time } = req.body;
            reminderService.updateReminder({ id, name, description, date, time }, id);
            return res.status(204).json();
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async detailReminder(req, res) {
        try {
            const { id } = req.params;
            const reminder = await reminderService.detailReminder(id);
            return res.status(200).json(reminder);
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async deleteReminder(req, res) {
        try {
            const { id } = req.params;
            userService.deleteReminder(id);
            return res.status(204).json();
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }
}

module.exports = new ReminderService();