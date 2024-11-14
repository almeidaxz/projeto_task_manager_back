class MainController {
    async listTasksAndReminders(req, res) {
        const { id } = req.params;
        try {
            const tasks = await knex('tasks').where({ id })
            const reminders = await knex('reminders').where({ id })
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