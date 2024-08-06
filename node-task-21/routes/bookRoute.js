const express = require('express');
const bookRouter = express.Router();
const bookController = require('../controller/bookController');
const bookValidation = require('../validation/bookValidation');
const { authChecker } = require('../common/common');

bookRouter.post('/add', authChecker, bookValidation.addBookValidation, bookController.addBook),

    bookRouter.post('/delete', authChecker, bookController.deleteBook),

    bookRouter.get('/getallbook', authChecker, bookController.getAllBook),

    bookRouter.post('/getAllBookByUserId', authChecker, bookController.getAllBookByUserId),

    bookRouter.post('/getAllbooksByUser', authChecker, bookController.getAllBookByUserIdwithUserInfo),

    bookRouter.get('/getAllBookUserData', authChecker, bookController.getAllBookUserData),

    bookRouter.post('/getAllCommentsByBookId', authChecker, bookController.getAllCommentsByBookId),

    module.exports = bookRouter;