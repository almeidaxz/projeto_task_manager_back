const knex = require('../../data/connection/dbConfig');

class TaskRepository {
    async getTaskById(id) {
        return await knex('task').where({ id }).first();
    }

    async createTask(task) {
        const { id, name, description, categories, due_date, due_time, user_id } = task;
        const newTask = await knex('task').insert({ id, name, description, categories, due_date, due_time, user_id }).returning('*');
        return newTask[0];
    }

    async listTasks(user_id) {
        return await knex('task').where({ user_id });
    }

    async updateTask(task, id) {
        const { name, description, categories, due_date, due_time, user_id } = task;
        const updatedTask = await knex('task').where({ id }).update({ id, name, description, categories, due_date, due_time, user_id }).returning('*');
        return updatedTask[0];
    }

    async deleteTask(id) {
        const deletedTask = await knex('task').where({ id }).del().returning('*');
        return deletedTask[0];
    }
}

module.exports = new TaskRepository();