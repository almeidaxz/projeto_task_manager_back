const knex = require('../../data/connection/dbConfig');

class TaskRepository {
    async getTaskById(id, user_id) {
        return await knex('task').where({ id, user_id }).first();
    }

    async getTaskListById(idsList, user_id) {
        const foundTasks = await knex('task').whereIn('id', idsList).where({ user_id });
        return foundTasks;
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
        const { name, description, categories, due_date, due_time, user_id, is_done } = task;
        const updatedTask = await knex('task').where({ id }).update({ id, name, description, categories, due_date, due_time, user_id, is_done }).returning('*');
        return updatedTask[0];
    }

    async deleteTask(id) {
        const deletedTask = await knex('task').where({ id }).del().returning('*');
        return deletedTask[0];
    }

    async deleteTasks(idsList, user_id) {
        try {
            const trx = await knex.transaction();
            const tasks = await trx('task').whereIn('id', idsList).where({ user_id }).del().returning('*');
            await trx.commit();
            return tasks;
        } catch (error) {
            await trx.rollback();
            throw error;
        }
    }
}

module.exports = new TaskRepository();