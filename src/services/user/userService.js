const userRepository = require('../../repositorys/user/userRepository');
const errorHandler = require('../../errors/errors');
const { hash } = require('bcrypt');

class UserService {
    async createUser(user) {
        const existingUser = await userRepository.getUserByEmail(user.email);
        if (existingUser) throw new errorHandler.conflict('Usuário já cadastrado');
        const createdUser = await userRepository.createUser(user);
        return createdUser;
    }

    async loginUser(user) {
        const foundUser = await userRepository.getUserByEmail(user.email);
        const encryptedPassword = await hash(user.password, 10);
        if (foundUser.password !== encryptedPassword || !foundUser) throw new errorHandler.unauthorized('Email ou senha inválidos');
        return foundUser;
    }

    async detailUser(id) {
        const existingUser = await userRepository.getUserById(id);
        if (!existingUser) throw new errorHandler.notFound('Usuário não encontrado');
        return existingUser;
    }

    async updateUser(user, id) {
        const existingUser = await userRepository.getUserById(id);
        if (!existingUser) throw new errorHandler.notFound('Usuário não encontrado');
        const existingEmail = await userRepository.getUserByEmail(user.email);
        if (existingEmail && existingEmail.id !== user.id) throw new errorHandler.conflict('Email já cadastrado');
        return await userRepository.updateUser(user, id);
    }

    async deleteUser(id) {
        const existingUser = await userRepository.getUserById(id);
        if (!existingUser) throw new errorHandler.notFound('Usuário não encontrado');
        return await userRepository.deleteUser(id);
    }
}

module.exports = new UserService();