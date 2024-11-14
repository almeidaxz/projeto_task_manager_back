const { knex } = require('../../data/connection/dbConfig');

class UserRepository {
    async getUserByEmail(email) {
        return await knex('user').where({ email }).first().returning({ id: 'id', email: 'email', name: 'name' });
    }

    async getUserById(id) {
        return await knex('user').where({ id }).first().returning({ id: 'id', email: 'email', name: 'name' });
    }

    async createUser(user) {
        return await knex('user').insert(user).returning({ id: 'id', email: 'email', name: 'name' });
    }

    async updateUser(user, id) {
        return await knex('user').where({ id }).update(user).returning({ id: 'id', email: 'email', name: 'name' });
    }

    async deleteUser(id) {
        return await knex('user').where({ id }).del();
    }
}

module.exports = new UserRepository();