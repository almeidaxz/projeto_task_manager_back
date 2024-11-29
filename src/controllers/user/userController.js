const userService = require('../../services/user/userService');

// Controlador para a entidade User (usuário). Aqui são chamadas as funções do serviço e validadas as regras de negócio.
class UserController {
    // Responde com o novo usuário criado ou um erro.
    async createUser(req, res) {
        const { name, email, password } = req.body;
        try {
            const user = await userService.createUser({ name, email, password });
            return res.status(201).json(user);
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }

    // Responde com o usuário logado e token JWT ou um erro.
    async userLogin(req, res) {
        const { email, password } = req.body;

        try {
            const user = await userService.loginUser({ email, password });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }

    // Responde com o usuário ou um erro.
    async detailUser(req, res) {
        const { id } = req.params;
        try {
            const user = await userService.detailUser(id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }

    // Responde com o usuário atualizado ou um erro.
    async updateUser(req, res) {
        const { name, email, password } = req.body;
        const { id } = req.params;

        try {
            const user = await userService.updateUser({ name, email, password }, id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }

    // Responde com o usuário excluído ou um erro.
    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const user = await userService.deleteUser(id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }
}

module.exports = new UserController();