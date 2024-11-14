const { knex } = require('../../data/connection/dbConfig');

class TaskRepository {
    async getTaskById(id) {
        return await knex('task').where({ id }).first().returning('*');
    }

    async createTask(task, user_id) {
        const { id, name, description, category, date, time } = task;
        return await knex('task').insert({ id, name, description, category, date, time, user_id }).returning('*');
    }

    async listTasks(id) {
        return await knex('task').where({ id });
    }

    async updateTask(task, id) {
        return await knex('task').where({ id }).update(task).returning('*');
    }

    async deleteTask(id) {
        return await knex('task').where({ id }).del();
    }
}

module.exports = new TaskRepository();