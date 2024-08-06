const { check, validationResult } = require('express-validator');

const commentValidation = [
    check('userId').notEmpty().withMessage("user id can not be empty"),
    check('bookId').notEmpty().withMessage("book id can not be empty"),
    check('comment').notEmpty().withMessage("comment can not be empty"),
    check('rating').notEmpty().withMessage("rating can not be empty"),

    (req, res, next) => {
        let errors = validationResult(req).array();
        if (errors.length > 0) {
            return res.send({ status: 0, response: errors[0].msg })
        }
        return next()
    }
]


module.exports = {
    commentValidation 
}