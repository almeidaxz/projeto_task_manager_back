const express = require('express');

const taskController = require('../../controllers/task/taskController');

const { registerTaskSchema, editTaskSchema } = require('../../middlewares/schemas/taskSchemas');
const checkBody = require('../../middlewares/bodyValidation');

const checkAuthorization = require('../../middlewares/auth');

const taskRoutes = express();

taskRoutes.use(checkAuthorization);
taskRoutes.get('/:id', taskController.detailTask);
taskRoutes.delete('/', taskController.deleteTask);
taskRoutes.post('/', checkBody(registerTaskSchema), taskController.createTask);
taskRoutes.put('/:id', checkBody(editTaskSchema), taskController.updateTask);

module.exports = taskRoutes;