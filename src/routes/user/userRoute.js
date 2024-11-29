const express = require('express');

const userController = require('../../controllers/user/userController');

const { registerUserSchema, loginUserSchema, editUserSchema } = require('../../middlewares/schemas/userSchemas');
const checkBody = require('../../middlewares/bodyValidation');

const checkAuthorization = require('../../middlewares/auth');

// Rotas de usuários. Login e Cadastro não precisam de autenticação.
const userRoutes = express();

// Cadastro de usuário.
userRoutes.post('/', checkBody(registerUserSchema), userController.createUser);
// Login de usuário.
userRoutes.post('/login', checkBody(loginUserSchema), userController.userLogin);
// A partir daqui, as rotas solicitam autenticação.
userRoutes.use(checkAuthorization);
// Detalhar um usuário.
userRoutes.get('/:id', userController.detailUser);
// Excluir um usuário.
userRoutes.delete('/:id', userController.deleteUser);
// Atualizar um usuário.
userRoutes.put('/:id', checkBody(editUserSchema), userController.updateUser);

module.exports = userRoutes;