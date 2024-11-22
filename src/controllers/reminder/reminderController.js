const reminderService = require('../../services/reminder/reminderService');

class ReminderController {
    async createReminder(req, res) {
        const reminder = req.body;
        try {
            const newReminder = await reminderService.createReminder(reminder);
            return res.status(201).json(newReminder);
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }

    async updateReminder(req, res) {
        const { id } = req.params;
        const reminder = req.body;
        try {
            const updatedReminder = await reminderService.updateReminder(reminder, id);
            return res.status(200).json(updatedReminder);
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }

    async detailReminder(req, res) {
        const { id } = req.params;
        const user_id = 1;
        // const user_id = req.user.id;
        try {
            const reminder = await reminderService.detailReminder(id, user_id);
            return res.status(200).json(reminder);
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }

    async deleteReminder(req, res) {
        const { id } = req.params;
        const user_id = 1;
        // const user_id = req.user.id;
        try {
            const reminder = await reminderService.deleteReminder(id, user_id);
            return res.status(200).json(reminder);
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }
}

module.exports = new ReminderController();