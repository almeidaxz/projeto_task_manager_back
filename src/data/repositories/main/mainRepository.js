const knex = require('../../connection/dbConfig');
const taskRepository = require('../task/taskRepository');
const reminderRepository = require('../reminder/reminderRepository');

// Repositório para a entidade Main (que representa a home da aplicação).
class MainRepository {
    // Busca as tarefas e lembretes de um determinado usuário. Utiliza Promisse.all para executar as duas consultas simultaneamente e retorna para o Service o resultado.
    async listTasksAndReminders(user_id) {
        return await Promise.all([taskRepository.listTasks(user_id), reminderRepository.listReminders(user_id)]);
    }
}

module.exports = new MainRepository();