const knex = require('../../data/connection/dbConfig');

// Repositório para a entidade Reminder (lembrete).
class ReminderRepository {
    // Busca um lembrete de um determinado usuário pelo id do lembrete.
    async getReminderById(id, user_id) {
        return await knex('reminder').where({ id, user_id }).first();
    }

    // Busca uma lista de lembretes de um determinado usuário presentes em uma lista de ids. Utilizado para checar a existencia de lembretes, antes da exclusão deles.
    async getReminderListById(idsList, user_id) {
        const foundReminders = await knex('reminder').whereIn('id', idsList).where({ user_id });
        return foundReminders;
    }

    // Cria um lembrete.
    async createReminder(reminder) {
        const newReminder = await knex('reminder').insert(reminder).returning('*');
        return newReminder[0];
    }

    // Busca uma lista de lembretes de um determinado usuário.
    async listReminders(user_id) {
        return await knex('reminder').where({ user_id });
    }

    // Atualiza um lembrete.
    async updateReminder(reminder, id) {
        const { name, description, due_date, due_time, user_id } = reminder;
        const updatedReminder = await knex('reminder').where({ id, user_id }).update({ name, description, due_date, due_time }).returning('*');
        return updatedReminder[0];
    }

    // Exclui um ou mais lembretes. Antes da exclusão, é feita uma busca para verificar se os lembretes existem. É utilizado `transaction` para evitar erros de integridade.
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