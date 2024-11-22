const express = require("express");

const reminderController = require("../../controllers/reminder/reminderController");

const { registerReminderSchema, editReminderSchema } = require('../../middlewares/schemas/reminderSchemas');
const checkBody = require('../../middlewares/bodyValidation');

const checkAuthorization = require("../../middlewares/auth");

const reminderRoutes = express();

// reminderRoutes.use(checkAuthorization);
reminderRoutes.get("/:id", reminderController.detailReminder);
reminderRoutes.delete("/:id", reminderController.deleteReminder);
reminderRoutes.post("/", checkBody(registerReminderSchema), reminderController.createReminder);
reminderRoutes.put("/:id", checkBody(editReminderSchema), reminderController.updateReminder);

module.exports = reminderRoutes;