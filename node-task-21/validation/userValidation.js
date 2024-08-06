const { check, validationResult } = require('express-validator')

const registerValidation = [

    check("name").notEmpty().withMessage("Name can not be empty"),
    check("email").isEmail().withMessage("email format is not correct").notEmpty().withMessage("Email can not be empty"),
    check("mobile")
        .notEmpty()
        .withMessage("Mobile Number can not be empty"),
    check("password")
        .notEmpty()
        .withMessage("Password can not be empty"),

    (req, res, next) => {
        let errors = validationResult(req).array()
        if (errors.length > 0) {

            return res.send({ status: 0, response: errors[0].msg })
        }

        return next()
    }
]


const loginValidation = [
    check("email").notEmpty().withMessage('Email can not be empty'),
    check("password").notEmpty().withMessage('Password can not be empty'),
    (req, res, next) => {
        let errors = validationResult(req).array()
        if (errors.length > 0) {

            return res.send({ status: 0, response: errors[0].msg })
        }

        return next()
    }
]


module.exports = {
    registerValidation,
    loginValidation
}