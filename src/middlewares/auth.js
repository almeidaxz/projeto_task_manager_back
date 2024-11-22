const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user/userRepository');

async function checkAuthorization(req, res, next) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                message: 'Token inválido. Realize o login novamente.'
            });
        }
        const { id, email, name } = jwt.verify(token, process.env.JWT_SECRET);
        const userFound = userRepository.getUserById(id);
        if (!userFound) {
            return res.status(401).json({
                message: 'Token inválido. Realize o login novamente.'
            });
        }
        req.user = { id, email, name }
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Token inválido. Realize o login novamente.'
        });
    }
}

module.exports = checkAuthorization;