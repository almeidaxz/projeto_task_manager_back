const knex = require('../../data/connection/dbConfig');

class ReminderRepository {
    async getReminderById(id, user_id) {
        return await knex('reminder').where({ id, user_id }).first();
    }

    async getReminderListById(idsList, user_id) {
        const foundReminders = await knex('reminder').whereIn('id', idsList).where({ user_id });
        return foundReminders;
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

    async deleteReminders(idsList, user_id) {
        try {
            const trx = await knex.transaction();
            const reminders = await trx('reminder').whereIn('id', idsList).where({ user_id }).del().returning('*');
            await trx.commit();
            return reminders;
        } catch (error) {
            await trx.rollback();
            throw error;
        }
    }
}

module.exports = new ReminderRepository();