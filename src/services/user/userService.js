const userRepository = require('../../repositories/user/userRepository');
const errorHandler = require('../../errors/errors');
const { DatabaseError } = require('pg');
const { hash, compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');

class UserService {
    async createUser(user) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            const existingUser = await userRepository.getUserByEmail(user.email);
            if (existingUser) throw new errorHandler.conflict('Usuário já cadastrado');
            user.password = await hash(user.password, 10);
            const createdUser = await userRepository.createUser(user);
            if (!createdUser) throw new errorHandler.internalError('Erro ao criar usuário.');
            return { ...responseObject, success: true, response: createdUser, statusCode: 201 };
        } catch (error) {
            if (error instanceof DatabaseError) response.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }

    async loginUser(user) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            const foundUser = await userRepository.getUserByEmail(user.email);
            if (!foundUser) throw new errorHandler.unauthorized('Email ou senha inválidos');
            const rightPassword = await compare(user.password, foundUser.password);
            if (!rightPassword) throw new errorHandler.unauthorized('Email ou senha inválidos');
            const token = sign(
                { id: foundUser.id, name: foundUser.name, email: foundUser.email },
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );
            const { password: _, ...userData } = foundUser
            return { ...responseObject, success: true, response: { token, user: userData }, statusCode: 200 };
        } catch (error) {
            if (error instanceof DatabaseError) response.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }

    async detailUser(id) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            const existingUser = await userRepository.getUserById(id);
            if (!existingUser) throw new errorHandler.notFound('Usuário não encontrado');
            return { ...responseObject, success: true, response: existingUser, statusCode: 200 };
        } catch (error) {
            if (error instanceof DatabaseError) response.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }

    async updateUser(user, id) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            const existingUser = await userRepository.getUserById(id);
            if (!existingUser) throw new errorHandler.notFound('Usuário não encontrado');
            const existingEmail = await userRepository.getUserByEmail(user.email);
            if (existingEmail && Number(existingEmail.id) !== Number(id)) throw new errorHandler.conflict('Email já cadastrado');
            user.password = await hash(user.password, 10);
            const updatedUser = await userRepository.updateUser(user, id);
            if (!updatedUser) throw new errorHandler.internalError('Erro ao atualizar usuário.');
            return { ...responseObject, success: true, response: updatedUser, statusCode: 200 };
        } catch (error) {
            if (error instanceof DatabaseError) response.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }

    async deleteUser(id) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            const existingUser = await userRepository.getUserById(id);
            if (!existingUser) throw new errorHandler.notFound('Usuário não encontrado');
            const deletedUser = await userRepository.deleteUser(id);
            if (!deletedUser) throw new errorHandler.internalError('Erro ao deletar usuário.');
            return { ...responseObject, success: true, response: deletedUser, statusCode: 200 };
        } catch (error) {
            if (error instanceof DatabaseError) response.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }
}

module.exports = new UserService();