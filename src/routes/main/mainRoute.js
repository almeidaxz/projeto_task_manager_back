const express = require('express');
const mainRoute = express();

const mainController = require('../../controllers/main/mainController');
const checkAuthorization = require('../../middlewares/auth');

mainRoute.use(checkAuthorization);
mainRoute.get('/', mainController.listTasksAndReminders);

module.exports = mainRoute