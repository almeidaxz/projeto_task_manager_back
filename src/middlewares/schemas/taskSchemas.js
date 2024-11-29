const joi = require('joi');

// Mensagens de erro utilizadas pelo validador de schema JOI.
const errorUserId = {
    'any.required': 'O id do usuário deve ser um número inteiro e positivo acima de 0.',
    'number.integer': 'O id do usuário deve ser um número inteiro e positivo acima de 0.',
    'number.positive': 'O id do usuário deve ser um número inteiro e positivo acima de 0.',
    'number.greater': 'O id do usuário deve ser um número inteiro e positivo acima de 0.'
}

const errorName = {
    'any.required': 'O nome da tarefa deve ser informado.',
    'string.min': 'O nome deve ter no mínimo 4 caracteres.',
    'string.empty': 'O nome da tarefa deve ser informado.',
}

const errorDescription = {
    'string.min': 'A descrição da tarefa deve possuir pelo menos 10 caracteres.',
}

const errorCategories = {
    'string.pattern.base': 'As categorias devem ser palavras separadas por vírgula. EX: "Trabalho, Estudo".',
    'object.regex': 'As categorias devem ser palavras separadas por várgula. EX: "Trabalho, Estudo".',
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

// Regex utilizadas pelo validador de schema JOI.
categoriesRegex = /^[a-zA-Z]+(,[a-zA-Z]+)*$/;
dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

// Validações de schemas para cadastro e edição de tarefas.
const registerTaskSchema = joi.object({
    user_id: joi.number().integer().positive().greater(0).required().messages(errorUserId),
    name: joi.string().required().empty().min(4).messages(errorName),
    description: joi.string().allow('', null).optional().messages(errorDescription),
    categories: joi.string().allow('', null).optional().pattern(categoriesRegex).messages(errorCategories),
    due_date: joi.string().required().pattern(dateRegex).empty().messages(errorDueDate),
    due_time: joi.string().required().pattern(timeRegex).messages(errorDueTime)
});

const editTaskSchema = joi.object({
    user_id: joi.number().integer().positive().greater(0).required().messages(errorUserId),
    name: joi.string().required().empty().min(4).messages(errorName),
    description: joi.string().allow('', null).optional().min(10).messages(errorDescription),
    categories: joi.string().allow('', null).optional().pattern(categoriesRegex).messages(errorCategories),
    due_date: joi.string().required().pattern(dateRegex).empty().messages(errorDueDate),
    due_time: joi.string().required().pattern(timeRegex).messages(errorDueTime),
    is_done: joi.boolean().optional()
});

module.exports = { registerTaskSchema, editTaskSchema }