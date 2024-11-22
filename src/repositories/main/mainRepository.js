const knex = require('../../data/connection/dbConfig');
const taskRepository = require('../task/taskRepository');
const reminderRepository = require('../reminder/reminderRepository');

const { DatabaseError } = require('pg');
const { dbError } = require('../../errors/errors');

class MainRepository {
    async listTasksAndReminders(user_id) {
        return await Promise.all([taskRepository.listTasks(user_id), reminderRepository.listReminders(user_id)]);
    }
}

module.exports = new MainRepository();