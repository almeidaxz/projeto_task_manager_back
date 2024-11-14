const express = require('express');
const taskRoutes = express();

const taskController = require('../../controllers/task/taskController');
const taskMiddleware = require('../../middlewares/task/taskMiddleware');
const checkAuthorization = require('../../middlewares/auth');

taskRoutes.use(checkAuthorization);
taskRoutes.get('/:id', taskController.detailTask);
taskRoutes.delete('/:id', taskController.deleteTask);
taskRoutes.use(taskMiddleware.checkBody);
taskRoutes.post('/', taskController.createTask);
taskRoutes.put('/:id', taskController.updateTask);

module.exports = taskRoutes;