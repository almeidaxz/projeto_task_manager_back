const mainService = require('../../services/main/mainService');

class MainController {
    async listTasksAndReminders(req, res) {
        const user_id = req.user.id
        try {
            const tasksRemindersList = await mainService.listTasksAndReminders(user_id);
            return res.status(200).json(tasksRemindersList)
        } catch (error) {
            return res.status(error.code).json(error.message)
        }
    }
}

module.exports = new MainController();