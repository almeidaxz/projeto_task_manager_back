const knex = require('../../data/connection/dbConfig');

// Repositório para a entidade User (usuário).
class UserRepository {
    // Busca um usuário pelo email. Utilizado para verificar se o email ja foi cadastrado.
    async getUserByEmail(email) {
        return await knex('user').where({ email }).first().returning({ id: 'id', email: 'email', name: 'name' });
    }

    // Busca um usuário pelo id.
    async getUserById(id) {
        return await knex('user').where({ id }).first().returning({ id: 'id', email: 'email', name: 'name' });
    }

    // Cria um novo usuario.
    async createUser(user) {
        const { email, name, password } = user;
        const newUser = await knex('user').insert({ email, name, password }).returning({ email: 'email', name: 'name' });
        return newUser[0];
    }

    // Atualiza um usuario.
    async updateUser(user, id) {
        const { email, name, password } = user;
        const updatedUser = await knex('user').where({ id }).update({ email, name, password }).returning({ id: 'id', email: 'email', name: 'name' });
        return updatedUser[0];
    }

    // Deleta um usuario.
    async deleteUser(id) {
        const deletedUser = await knex('user').where({ id }).del().returning({ id: 'id', email: 'email', name: 'name' });
        return deletedUser[0];
    }
}

module.exports = new UserRepository();