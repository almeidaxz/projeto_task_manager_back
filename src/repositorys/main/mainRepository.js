const { knex } = require('../../data/connection/dbConfig');

class MainRepository {
    async listUserReminders(user_id) {
        return await knex('reminder').where({ user_id });
    }

    async listUserTasks(user_id) {
        return await knex('task').where({ user_id });
    }
}

module.exports = new MainRepository();