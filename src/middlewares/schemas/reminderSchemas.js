const joi = require('joi');

const errorId = {
    'any.required': 'O id do lembrete deve ser um número inteiro e positivo acima de 0.',
    'number.integer': 'O id do lembrete deve ser um número inteiro e positivo acima de 0.',
    'number.positive': 'O id do lembrete deve ser um número inteiro e positivo acima de 0.',
    'number.greater': 'O id do lembrete deve ser um número inteiro e positivo acima de 0.'
}

const errorUserId = {
    'any.required': 'O id do usuário deve ser um número inteiro e positivo acima de 0.',
    'number.integer': 'O id do usuário deve ser um número inteiro e positivo acima de 0.',
    'number.positive': 'O id do usuário deve ser um número inteiro e positivo acima de 0.',
    'number.greater': 'O id do usuário deve ser um número inteiro e positivo acima de 0.'
}

const errorName = {
    'any.required': 'O nome do lembrete deve ser informado.',
    'string.min': 'O nome deve ter no mínimo 4 caracteres.',
    'string.empty': 'O nome do lembrete deve ser informado.',
}

const errorDescription = {
    'string.min': 'A descrição do lembrete deve possuir pelo menos 10 caracteres.',
}

const errorDueDate = {
    'any.required': 'A data de término deve ser informada.',
    'string.empty': 'A data de término deve ser informada.',
    'string.pattern.base': 'A data deve ter o formato DD/MM/YYYY.',
    'object.regex': 'A data deve ter o formato DD/MM/YYYY.'
}

const errorDueTime = {
    'any.required': 'A hora de término deve ser informada.',
    'string.empty': 'A hora de término deve ser informada.',
    'string.pattern.base': 'A hora deve ter o formato HH:mm com padrao 24h.',
    'object.regex': 'A hora deve ter o formato HH:mm com padrao 24h.'

}

dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

const registerReminderSchema = joi.object({
    user_id: joi.number().integer().positive().greater(0).required().messages(errorUserId),
    name: joi.string().required().empty().min(4).messages(errorName),
    description: joi.string().optional().min(10).messages(errorDescription),
    due_date: joi.string().required().pattern(dateRegex).empty().messages(errorDueDate),
    due_time: joi.string().required().pattern(timeRegex).messages(errorDueTime)
});

const editReminderSchema = joi.object({
    user_id: joi.number().integer().positive().greater(0).required().messages(errorUserId),
    name: joi.string().required().empty().min(4).messages(errorName),
    description: joi.string().optional().min(10).messages(errorDescription),
    due_date: joi.string().required().pattern(dateRegex).empty().messages(errorDueDate),
    due_time: joi.string().required().pattern(timeRegex).messages(errorDueTime)
});

module.exports = { registerReminderSchema, editReminderSchema }