const userService = require('../../services/user/userService');

class UserController {
    async createUser(req, res) {
        const { name, email, password } = req.body;
        try {
            const user = await userService.createUser({ name, email, password });
            return res.status(201).json(user);
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }

    async userLogin(req, res) {
        const { email, password } = req.body;

        try {
            const user = await userService.loginUser({ email, password });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }

    async detailUser(req, res) {
        const { id } = req.params;
        try {
            const user = await userService.detailUser(id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(error.code).json(error.message);
        }
    }

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