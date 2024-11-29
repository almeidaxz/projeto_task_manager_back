const joi = require('joi');

// Mensagens de erro utilizadas pelo validador de schema JOI.
const errorEmail = {
    'any.required': 'O email deve ser informado.',
    'string.email': `O email deve ser um email válido no formato 'usuario@dominio.com'.`,
    'string.empty': 'O email deve ser informado.',
}

const errorPassword = {
    'string.min': 'A senha deve ter no mínimo 4 caracteres.',
}

const errorFullName = {
    'any.required': 'O nome completo deve ser informado (nome e sobrenome, sem números).',
    'string.empty': 'O nome completo deve ser informado (nome e sobrenome, sem números).',
    'string.pattern.base': 'O nome completo deve ser informado (nome e sobrenome, sem números).',
}

// Regex utilizadas pelo validador de schema JOI.
fullNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:['-][A-Za-zÀ-ÖØ-öø-ÿ]+)* [A-Za-zÀ-ÖØ-öø-ÿ]+(?:['-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

// Validações de schemas para cadastro, login e edição de usuários.
const registerUserSchema = joi.object({
    name: joi.string().required().empty().pattern(fullNameRegex).messages(errorFullName),
    email: joi.string().required().empty().email().messages(errorEmail),
    password: joi.string().required().empty().min(4).messages(errorPassword),
});

const loginUserSchema = joi.object({
    email: joi.string().required().empty().email().messages(errorEmail),
    password: joi.string().required().empty().min(4).messages(errorPassword),
});

const editUserSchema = joi.object({
    email: joi.string().required().empty().email().messages(errorEmail),
    password: joi.string().allow('', null).optional().min(4).messages(errorPassword),
    name: joi.string().required().empty().pattern(fullNameRegex).messages(errorFullName),
});

module.exports = { registerUserSchema, editUserSchema, loginUserSchema }