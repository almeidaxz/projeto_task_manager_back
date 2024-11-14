class MainController {
    async listTasksAndReminders(req, res) {
        try {
            const tasks = await knex('tasks')
            const reminders = await knex('reminders')
            const tasksRemindersList = {
                tasks,
                reminders
            }
            return res.status(200).json(tasksRemindersList)
        } catch (error) {
            return res.status(error.status).json(error.message)
        }
    }
}

module.exports = new MainController();