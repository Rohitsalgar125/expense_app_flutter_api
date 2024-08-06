const express = require('express');
const { authChecker } = require('../common/common');
const { commentValidation } = require('../validation/commentValidation');
const commentController = require('../controller/commentController')
const commentRouter = express.Router();

commentRouter.post('/add', authChecker, commentValidation, commentController.addComment)


module.exports = commentRouter;