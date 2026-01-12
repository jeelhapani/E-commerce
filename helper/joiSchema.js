const joi  = require("joi");
const validate = require("./joiValidation");

module.exports = {
    signupUser: joi.object().keys({
        name: validate.reqstring,
        email: validate.email,
        phoneNo: validate.reqstring,
        password: validate.reqPassword
    }),
    login: joi.object().keys({
        loginVal: validate.reqstring,
        password: validate.reqPassword,
    }),
    signupSeller: joi.object().keys({
        name: validate.reqstring,
        email: validate.email,
        password: validate.reqPassword,
        phoneNo: validate.reqstring,
        shopName: validate.reqstring
    }),
    createProduct: joi.object().keys({
        title: validate.reqstring,
        description: validate.reqstring,
        price: validate.reqNumber,
        quantity: validate.reqNumber
    }),
    manageProductCart: joi.object().keys({
        productId: validate.reqId,
        quantity: validate.reqNumber
    }),
    saveMessage: joi.object().keys({
        sender: validate.reqId,
        receiver: validate.reqId,
        message: validate.reqstring
    }),
    userChatHistory: joi.object().keys({
        senderId: validate.reqId,
        receiverId: validate.reqId
    }),
}