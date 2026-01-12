const joi = require("joi");

module.exports = {
    reqId: joi.string().pattern(/^[0-9a-fA-F]{24}$/).message("ENTER VALID ID...").required(),
    id: joi.string().pattern(/^[0-9a-fA-F]{24}$/).message("ENTER VALID ID...").required(),
    reqstring: joi.string().required(),
    string: joi.string().allow(""),
    email: joi.string().email().required(),
    reqDate: joi.date().required(),
    date: joi.date().allow(""),
    number: joi.number().allow(""),
    reqNumber: joi.number().required(),
    reqPassword: joi.string().min(3).message("password lenght more than 5 characters").required(),
    password: joi.string().min(3).message("password lenght more than 5 characters"),
    boolean: joi.boolean(),
    otp :joi.number().required(),
}