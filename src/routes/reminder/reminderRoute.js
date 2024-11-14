const express = require("express");
const reminderRoutes = express();

const reminderController = require("../../controllers/reminder/reminderController");
const reminderMiddleware = require("../../middlewares/reminder/reminderMiddleware");
const checkAuthorization = require("../../middlewares/auth");

reminderRoutes.use(checkAuthorization);
reminderRoutes.get("/:id", reminderController.detailReminder);
reminderRoutes.delete("/:id", reminderController.deleteReminder);
reminderRoutes.use(reminderMiddleware.checkBody);
reminderRoutes.post("/", reminderController.createReminder);
reminderRoutes.put("/:id", reminderController.updateReminder);

module.exports = reminderRoutes;