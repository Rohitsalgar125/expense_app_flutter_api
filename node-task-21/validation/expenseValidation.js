const { check, validationResult } = require('express-validator')

const addExpenseValidation = [
    check("amount").notEmpty().trim().withMessage("Amount can not be empty"),
    check("description").notEmpty().trim().withMessage("Amount can not be empty"),
    (req, res, next) => {
        let errors = validationResult(req).array();
        if (errors.length > 0) {
            return res.send({ status: 0, response: errors[0].msg })
        }
        return next()
    }
]


module.exports = {
    addExpenseValidation
}