const express = require('express');
const userRoutes = express();

const userController = require('../../controllers/user/userController');
const userMiddleware = require('../../middlewares/user/userMiddleware');
const checkAuthorization = require('../../middlewares/auth');

userRoutes.post('/', userMiddleware.checkBodyRegister, userController.createUser);
userRoutes.post('/login', userMiddleware.checkBodyLogin, userController.userLogin);
userRoutes.use(checkAuthorization);
userRoutes.get('/:id', userController.detailUser);
userRoutes.delete('/:id', userController.deleteUser);
userRoutes.put('/:id', userMiddleware.checkBodyRegister, userController.updateUser);

module.exports = userRoutes;