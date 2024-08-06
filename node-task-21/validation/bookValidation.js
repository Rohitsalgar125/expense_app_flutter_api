const { check, validationResult } = require('express-validator')

const addBookValidation = [
    check('title').notEmpty().withMessage('Title can not be empty'),
    check('userId').notEmpty().withMessage('User Id can not be empty'),
    check('author').notEmpty().withMessage('Author can not be empty'),
    check('publishedDate').notEmpty().withMessage('Published Date can not be empty'),

    (req, res, next) => {
        let errors = validationResult(req).array();
        if (errors.length > 0) {
            return res.send({ status: 0, response: errors[0].msg })
        }
        next();
    }

]


module.exports = {
    addBookValidation
}