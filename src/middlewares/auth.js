const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user/userRepository');

async function checkAuthorization(req, res, next) {
    const responseObject = { success: false, errors: [], response: null };
    try {
        const token = req.headers.authorization;
        if (!token) {
            responseObject.errors.push('Token inválido. Realize o login novamente.');
            return res.status(401).json(responseObject);
        }
        const { id, name, email } = jwt.verify(token, process.env.JWT_SECRET);
        const userFound = userRepository.getUserById(id);
        if (!userFound) {
            responseObject.errors.push('Token inválido. Realize o login novamente.');
            return res.status(401).json(responseObject);
        }
        req.user = { id, email, name }

        next();
    } catch (error) {
        responseObject.errors.push('Token inválido. Realize o login novamente.');
        return res.status(401).json(responseObject);
    }
}

module.exports = checkAuthorization;