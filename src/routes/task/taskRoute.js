const express = require('express');

const taskController = require('../../controllers/task/taskController');

const { registerTaskSchema, editTaskSchema } = require('../../middlewares/schemas/taskSchemas');
const checkBody = require('../../middlewares/bodyValidation');

const checkAuthorization = require('../../middlewares/auth');

// Rotas de tarefas. Todas nessecitam autenticação.
const taskRoutes = express();

taskRoutes.use(checkAuthorization);
// Detalhar uma tarefa.
taskRoutes.get('/:id', taskController.detailTask);
// Excluir uma tarefa.
taskRoutes.delete('/', taskController.deleteTask);
// Criar uma tarefa.
taskRoutes.post('/', checkBody(registerTaskSchema), taskController.createTask);
// Atualizar uma tarefa.
taskRoutes.put('/:id', checkBody(editTaskSchema), taskController.updateTask);

module.exports = taskRoutes;