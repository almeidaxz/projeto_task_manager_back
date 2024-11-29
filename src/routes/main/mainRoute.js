const express = require('express');
const mainRoute = express();

const mainController = require('../../controllers/main/mainController');
const checkAuthorization = require('../../middlewares/auth');

// Rota de listagem de tarefas e lembretes. Necessita autenticação
mainRoute.use(checkAuthorization);
mainRoute.get('/', mainController.listTasksAndReminders);

module.exports = mainRoute