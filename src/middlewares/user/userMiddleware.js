class UserMiddleware {
    checkBodyRegister(req, res, next) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Nome, email e senha são obrigatórios'
            })
        }
        next();
    }

    checkBodyLogin(req, res, next) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email e senha são obrigatórios'
            })
        }
        next();
    }
}

module.exports = new UserMiddleware();