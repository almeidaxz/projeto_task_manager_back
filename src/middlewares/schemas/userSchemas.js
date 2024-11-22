const joi = require('joi');

const errorEmail = {
    'any.required': 'O email deve ser informado.',
    'string.email': 'O email deve ser um email válido.',
    'string.empty': 'O email deve ser informado.',
}

const errorPassword = {
    'any.required': 'A senha deve ser informada.',
    'string.empty': 'A senha deve ser informada.',
    'string.min': 'A senha deve ter no mínimo 4 caracteres.',
}

const errorFullName = {
    'any.required': 'O nome completo deve ser informado.',
    'string.empty': 'O nome completo deve ser informado.',
    'string.pattern.base': 'O nome deve seguir o padrão de nome completo, sem números. EX: "Jean-Luc Sant\'Ana".',
}

const errorUserId = {
    'any.required': 'O id do usuário deve ser um número inteiro e positivo acima de 0.',
    'number.integer': 'O id do usuário deve ser um número inteiro e positivo acima de 0.',
    'number.positive': 'O id do usuário deve ser um número inteiro e positivo acima de 0.',
    'number.greater': 'O id do usuário deve ser um número inteiro e positivo acima de 0.'
}

fullNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:['-][A-Za-zÀ-ÖØ-öø-ÿ]+)*(?: [A-Za-zÀ-ÖØ-öø-ÿ]+(?:['-][A-Za-zÀ-ÖØ-öø-ÿ]+)*)*$/;

const registerUserSchema = joi.object({
    email: joi.string().required().empty().email().messages(errorEmail),
    password: joi.string().required().empty().min(4).messages(errorPassword),
    name: joi.string().required().empty().pattern(fullNameRegex).messages(errorFullName),
});

const loginUserSchema = joi.object({
    email: joi.string().required().empty().email().messages(errorEmail),
    password: joi.string().required().empty().min(4).messages(errorPassword),
});

const editUserSchema = joi.object({
    email: joi.string().required().empty().email().messages(errorEmail),
    password: joi.string().required().empty().min(4).messages(errorPassword),
    name: joi.string().required().empty().pattern(fullNameRegex).messages(errorFullName),
});

module.exports = { registerUserSchema, editUserSchema, loginUserSchema }