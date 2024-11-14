const { knex } = require('../../data/connection/dbConfig');

class TaskRepository {
    async getTaskById(id) {
        return await knex('task').where({ id }).first().returning('*');
    }

    async createTask(task) {
        return await knex('task').insert(task).returning('*');
    }

    async updateTask(task, id) {
        return await knex('task').where({ id }).update(task).returning('*');
    }

    async deleteTask(id) {
        return await knex('task').where({ id }).del();
    }
}

module.exports = new TaskRepository();