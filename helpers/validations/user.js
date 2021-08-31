const joi = require('joi');


const SignupSchema = joi.object({
    fullName: joi.string().required().example('< example >'),
    dob: joi.date().required(),
    role: joi.string().required(),
    phoneNumber: joi.number().required(),
    email: joi.string().email().required().example('< username@example.com >'),
    password: joi.string().required().example('< password >'),
})

const LoginSchema = joi.object({
    email: joi.string().email().required().example('< username@example.com >'),
    password: joi.string().required().example('< password >'),
})

module.exports = {
    SignupSchema,
    LoginSchema,
}