const { knex } = require('../../data/connection/dbConfig');

class ReminderRepository {
    async getReminderById(id) {
        return await knex('reminder').where({ id }).first().returning('*');
    }

    async createReminder(reminder) {
        return await knex('reminder').insert(reminder).returning('*');
    }

    async updateReminder(reminder, id) {
        return await knex('reminder').where({ id }).update(reminder).returning('*');
    }

    async deleteReminder(id) {
        return await knex('reminder').where({ id }).del();
    }
}

module.exports = new ReminderRepository();