const mainService = require('../../services/main/mainService');

// Controlador para a entidade Main (que representa a home da aplicação). Aqui são chamadas as funções do serviço.
class MainController {
    // Responde com as tarefas e lembretes de um determinado usuário ou um erro.
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