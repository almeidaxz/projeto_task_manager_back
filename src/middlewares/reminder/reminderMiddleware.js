class ReminderMiddleware {
    checkBody(req, res, next) {
        const { name, date, time } = req.body;
        if (name, date, time) {
            return res.status(400).json({
                message: 'Nome, Data e Hora de expiração são obrigatórios'
            })
        }
        next();
    }
}

module.exports = new ReminderMiddleware();