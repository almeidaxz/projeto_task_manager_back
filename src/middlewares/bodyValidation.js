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