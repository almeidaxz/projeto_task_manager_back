const express = require('express');

const userController = require('../../controllers/user/userController');

const { registerUserSchema, loginUserSchema, editUserSchema } = require('../../middlewares/schemas/userSchemas');
const checkBody = require('../../middlewares/bodyValidation');

const checkAuthorization = require('../../middlewares/auth');

const userRoutes = express();

userRoutes.post('/', checkBody(registerUserSchema), userController.createUser);
userRoutes.post('/login', checkBody(loginUserSchema), userController.userLogin);
// userRoutes.use(checkAuthorization);
userRoutes.get('/:id', userController.detailUser);
userRoutes.delete('/:id', userController.deleteUser);
userRoutes.put('/:id', checkBody(editUserSchema), userController.updateUser);

module.exports = userRoutes;