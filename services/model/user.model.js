const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        wallet: {
            type: Number,
            default: 0
        }
    }
);

module.exports = mongoose.model("user", userModel);