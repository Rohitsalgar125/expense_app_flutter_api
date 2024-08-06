const express = require('express');

const userRouter = express.Router();

const userController = require('../controller/userController.js');

const userValidation = require('../validation/userValidation.js');

const { authChecker } = require('../common/common.js');

userRouter.get("/me", userController.me)
userRouter.post('/register', userValidation.registerValidation, userController.register)
userRouter.get('/allusers', authChecker, userController.getAllUser)
userRouter.post('/getUserById', authChecker, userController.getUserById)
userRouter.post('/login', userValidation.loginValidation, userController.login)
userRouter.post('/delete', authChecker, userController.deleteUser)
userRouter.get('/test', authChecker, userController.test)


module.exports = userRouter