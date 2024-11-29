const express = require("express");

const reminderController = require("../../controllers/reminder/reminderController");

const { registerReminderSchema, editReminderSchema } = require('../../middlewares/schemas/reminderSchemas');
const checkBody = require('../../middlewares/bodyValidation');

const checkAuthorization = require("../../middlewares/auth");

// Rotas de lembretes. Todas nessecitam autenticação.
const reminderRoutes = express();

reminderRoutes.use(checkAuthorization);
// Detalhar um lembrete.
reminderRoutes.get("/:id", reminderController.detailReminder);
// Excluir um ou mais lembretes.
reminderRoutes.delete("/", reminderController.deleteReminder);
// Criar um lembrete.
reminderRoutes.post("/", checkBody(registerReminderSchema), reminderController.createReminder);
// Atualizar um lembrete.
reminderRoutes.put("/:id", checkBody(editReminderSchema), reminderController.updateReminder);

module.exports = reminderRoutes;