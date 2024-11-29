// Intermediário que valida o conteúdo do corpo da requisição. É solicitado em todas as rotas que recebem dados no seu corpo.
const checkBody = joiSchema => async (req, res, next) => {
    try {
        await joiSchema.validateAsync(req.body);
        next();
    } catch (error) {
        const responseObject = { success: false, errors: [], response: null };
        responseObject.errors.push(error.message);
        return res.status(400).json(responseObject);
    }
}

module.exports = checkBody