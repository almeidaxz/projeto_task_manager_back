const userRepository = require('../../repositories/user/userRepository');
const errorHandler = require('../../errors/errors');
const { DatabaseError } = require('pg');
const { hash, compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');

// Serviço para a entidade User (usuário). Aqui são chamadas as funções do repositório e validadas as regras de negócio.
class UserService {
    // Insere um novo usuário no banco.
    async createUser(user) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            // Verifica se o email do usuário ja foi cadastrado. Caso sim, lança exceção que será tratada no catch.
            const existingUser = await userRepository.getUserByEmail(user.email);
            if (existingUser) throw new errorHandler.conflict('Usuário já cadastrado');
            // Criptografa a senha do usuário.
            user.password = await hash(user.password, 10);
            // Chama o método do repositório responsável por inserir um novo registro no banco. Caso erro, lança uma exceção que sera tratada no catch.
            const createdUser = await userRepository.createUser(user);
            if (!createdUser) throw new errorHandler.internalError('Erro ao criar usuário.');
            return { ...responseObject, success: true, response: createdUser, statusCode: 201 };
        } catch (error) {
            // Adiciona o erro à lista e retorna a resposta ao usuário.
            if (error instanceof DatabaseError) response.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }

    // Realiza o login do usuário.
    async loginUser(user) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            // Verifica se o usuário existe, através do seu email. Caso nao exista, lanca uma exceção que sera tratada no catch.
            const foundUser = await userRepository.getUserByEmail(user.email);
            if (!foundUser) throw new errorHandler.unauthorized('Email ou senha inválidos');
            // Verifica se a senha do usuário corresponde ao cadastrado no banco. Caso não, lanca uma exceção que sera tratada no catch.
            const rightPassword = await compare(user.password, foundUser.password);
            if (!rightPassword) throw new errorHandler.unauthorized('Email ou senha inválidos');
            // Em caso de sucesso, um token JWT é gerado e retornado ao usuário.
            const token = sign(
                { id: foundUser.id, name: foundUser.name, email: foundUser.email },
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );
            const { password: _, ...userData } = foundUser
            return { ...responseObject, success: true, response: { token, user: userData }, statusCode: 200 };
        } catch (error) {
            // Adiciona o erro à lista e retorna a resposta ao usuário.
            if (error instanceof DatabaseError) response.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }

    // Busca um usuário pelo id.
    async detailUser(id) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            // Chama o método do repositório responsável por buscar um usuário pelo id. Caso não encontre, lanca uma exceção que sera tratada no catch. Caso sucesso, retorna o detalhamento.
            const existingUser = await userRepository.getUserById(id);
            if (!existingUser) throw new errorHandler.notFound('Usuário não encontrado');
            return { ...responseObject, success: true, response: existingUser, statusCode: 200 };
        } catch (error) {
            // Adiciona o erro à lista e retorna a resposta ao usuário.
            if (error instanceof DatabaseError) response.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }

    // Atualiza um usuário pelo id.
    async updateUser(user, id) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            // Busca um usuário pelo id. Caso nao encontre, lanca uma exceção que sera tratada no catch.
            const existingUser = await userRepository.getUserById(id);
            if (!existingUser) throw new errorHandler.notFound('Usuário não encontrado');
            // Verifica se o email já está cadastrado para outro usuário. Caso sim, lanca uma exceção que sera tratada no catch.
            const existingEmail = await userRepository.getUserByEmail(user.email);
            if (existingEmail && Number(existingEmail.id) !== Number(id)) throw new errorHandler.conflict('Email já cadastrado');
            // Verifica se a senha nova senha foi informada. Caso sim, criptografa a nova senha.
            if (user.password) user.password = await hash(user.password, 10);
            // Chama o método do repositório responsável por atualizar o usuário. Caso erro, lança uma exceção que sera tratada no catch.
            const updatedUser = await userRepository.updateUser(user, id);
            if (!updatedUser) throw new errorHandler.internalError('Erro ao atualizar usuário.');
            return { ...responseObject, success: true, response: updatedUser, statusCode: 200 };
        } catch (error) {
            // Adiciona o erro à lista e retorna a resposta ao usuário.
            if (error instanceof DatabaseError) response.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }

    // Deleta um usuário pelo id.
    async deleteUser(id) {
        const responseObject = { success: false, errors: [], response: null, statusCode: null };
        try {
            // Busca um usuário pelo id. Caso nao encontre, lanca uma exceção que sera tratada no catch.
            const existingUser = await userRepository.getUserById(id);
            if (!existingUser) throw new errorHandler.notFound('Usuário não encontrado');
            // Chama o método do repositório responsável por deletar o usuário. Caso erro, lança uma exceção que sera tratada no catch.
            const deletedUser = await userRepository.deleteUser(id);
            if (!deletedUser) throw new errorHandler.internalError('Erro ao deletar usuário.');
            return { ...responseObject, success: true, response: deletedUser, statusCode: 200 };
        } catch (error) {
            // Adiciona o erro à lista e retorna a resposta ao usuário.
            if (error instanceof DatabaseError) response.errors.push("Erro na conexão com o banco de dados.");
            responseObject.errors.push(error.message);
            responseObject.statusCode = error.statusCode;
            return responseObject
        }
    }
}

module.exports = new UserService();