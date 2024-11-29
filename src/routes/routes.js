const express = require('express');
const taskRoutes = require('./task/taskRoute');
const userRoutes = require('./user/userRoute');
const reminderRoutes = require('./reminder/reminderRoute');
const mainRoutes = require('./main/mainRoute');

// Rotas principais. Importa as rotas modularizadas de cada entidade.
const router = express();

router.use('/user', userRoutes);
router.use('/main', mainRoutes);
router.use('/task', taskRoutes);
router.use('/reminder', reminderRoutes);

module.exports = router;