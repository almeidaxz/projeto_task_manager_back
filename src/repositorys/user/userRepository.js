const { knex } = require('../../connection/dbConfig');

class UserRepository {
    async getUserByEmail(email) {
        return await knex('users').where({ email }).first().returning({ id: 'id', email: 'email', name: 'name' });
    }

    async getUserById(id) {
        return await knex('users').where({ id }).first().returning({ id: 'id', email: 'email', name: 'name' });
    }

    async createUser(user) {
        return await knex('users').insert(user).returning({ id: 'id', email: 'email', name: 'name' });
    }

    async updateUser(user, id) {
        return await knex('users').where({ id }).update(user).returning({ id: 'id', email: 'email', name: 'name' });
    }

    async deleteUser(id) {
        return await knex('users').where({ id }).del();
    }
}

module.exports = new UserRepository();