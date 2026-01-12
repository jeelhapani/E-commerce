const express = require("express");
const router = express.Router();
const Validator = require("../helper/joiValidationCheck");
const Schema = require("../helper/joiSchema");
const { verifyAccessToken } = require("../helper/verify.token");
const { VerifyAccessPermission } = require("../helper/verify.Permission");
const createUpload = require("../helper/fileUpload");

require("../helper/pattern");

const userController = require("../route_controller/user");

router.post(
    "/user_signup",
    Validator.forReqBody(Schema.signupUser),
    userController.signup
);

router.post(
    "/user_login",
    Validator.forReqBody(Schema.login),
    userController.login
);



const sellerServices = require("../route_controller/seller");

router.post(
    "/seller_signup",
    Validator.forReqBody(Schema.signupSeller),
    sellerServices.sellerSignup
);

router.post(
    "/seller_login",
    Validator.forReqBody(Schema.login),
    sellerServices.sellerLogin
);



const productController = require("../route_controller/product");

const productUpload = createUpload({ uploadPath: "./public/upload/product" });
router.post(
    "/create_product",
    verifyAccessToken,
    VerifyAccessPermission(["seller"]),
    productUpload.array("images"),
    Validator.forReqBody(Schema.createProduct),
    productController.createProduct
);

router.post(
    "/manage_product_cart",
    verifyAccessToken,
    VerifyAccessPermission(["user"]),
    Validator.forReqBody(Schema.manageProductCart),
    productController.manageProductCart
);

router.post(
    "/get_cart",
    verifyAccessToken,
    VerifyAccessPermission(["user"]),
    productController.getCart
);



const chatController = require("../route_controller/chat");
router.post(
    "/save_chat",
    verifyAccessToken,
    VerifyAccessPermission(["user"]),
    Validator.forReqBody(Schema.saveMessage),
    chatController.createChat
);

router.get(
    "/uer_to_user_chat_list",
    verifyAccessToken,
    VerifyAccessPermission(["user"]),
    chatController.chatWiseUserList
);

router.post(
    "/user_chat_History",
    verifyAccessToken,
    VerifyAccessPermission(["user"]),
    Validator.forReqBody(Schema.userChatHistory),
    chatController.userChatHistory
);












module.exports = router;