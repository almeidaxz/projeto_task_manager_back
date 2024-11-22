const knex = require('../../data/connection/dbConfig');

class UserRepository {
    async getUserByEmail(email) {
        return await knex('user').where({ email }).first().returning({ id: 'id', email: 'email', name: 'name' });
    }

    async getUserById(id) {
        return await knex('user').where({ id }).first().returning({ id: 'id', email: 'email', name: 'name' });
    }

    async createUser(user) {
        const { email, name, password } = user;
        const newUser = await knex('user').insert({ email, name, password }).returning({ email: 'email', name: 'name' });
        return newUser[0];
    }

    async updateUser(user, id) {
        const { email, name, password } = user;
        const updatedUser = await knex('user').where({ id }).update({ email, name, password }).returning({ id: 'id', email: 'email', name: 'name' });
        return updatedUser[0];
    }

    async deleteUser(id) {
        const deletedUser = await knex('user').where({ id }).del().returning({ id: 'id', email: 'email', name: 'name' });
        return deletedUser[0];
    }
}

module.exports = new UserRepository();