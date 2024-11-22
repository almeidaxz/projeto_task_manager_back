const knex = require('../../data/connection/dbConfig');

class ReminderRepository {
    async getReminderById(id, user_id) {
        return await knex('reminder').where({ id, user_id }).first();
    }

    async createReminder(reminder) {
        const newReminder = await knex('reminder').insert(reminder).returning('*');
        return newReminder[0];
    }


    async listReminders(user_id) {
        return await knex('reminder').where({ user_id });
    }

    async updateReminder(reminder, id) {
        const { name, description, due_date, due_time, user_id } = reminder;
        const updatedReminder = await knex('reminder').where({ id, user_id }).update({ name, description, due_date, due_time }).returning('*');
        return updatedReminder[0];
    }

    async deleteReminder(id, user_id) {
        const deletedReminder = await knex('reminder').where({ id, user_id }).del().returning('*');
        return deletedReminder[0];
    }
}

module.exports = new ReminderRepository();