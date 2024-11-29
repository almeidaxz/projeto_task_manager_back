const knex = require('../../connection/dbConfig');

// Repositório para a entidade Task (tarefa).
class TaskRepository {
    // Busca uma tarefa de um determinado usuário pelo id da tarefa.
    async getTaskById(id, user_id) {
        return await knex('task').where({ id, user_id }).first();
    }

    // Busca uma lista de tarefas de um determinado usuário presentes em uma lista de ids. Utilizado para checar a existencia de tarefas, antes da exclusão delas.
    async getTaskListById(idsList, user_id) {
        const foundTasks = await knex('task').whereIn('id', idsList).where({ user_id });
        return foundTasks;
    }

    // Cria uma tarefa.
    async createTask(task) {
        const { id, name, description, categories, due_date, due_time, user_id } = task;
        const newTask = await knex('task').insert({ id, name, description, categories, due_date, due_time, user_id }).returning('*');
        return newTask[0];
    }

    // Busca uma lista de tarefas de um determinado usuário.
    async listTasks(user_id) {
        return await knex('task').where({ user_id });
    }

    // Atualiza uma tarefa.
    async updateTask(task, id) {
        const { name, description, categories, due_date, due_time, user_id, is_done } = task;
        const updatedTask = await knex('task').where({ id }).update({ id, name, description, categories, due_date, due_time, user_id, is_done }).returning('*');
        return updatedTask[0];
    }

    // Exclui um ou mais tarefas. Antes da exclusão, é feita uma busca para verificar se as tarefas existem. É utilizado `transaction` para evitar erros de integridade.
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