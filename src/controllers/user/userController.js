const userService = require('../../services/user/userService');

class UserController {
    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            userService.createUser({ name, email, password });
            return res.status(201).json();
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async userLogin(req, res) {
        try {
            const { email, password } = req.body;
            userService.loginUser({ email, password });
            return res.status(204).json();
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async detailUser(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.detailUser(id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async updateUser(req, res) {
        try {
            const { name, email, password } = req.body;
            userService.updateUser({ name, email, password });
            return res.status(204).json();
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            userService.deleteUser(id);
            return res.status(204).json();
        } catch (error) {
            return res.status(error.status).json(error.message);
        }
    }
}

module.exports = new UserController();