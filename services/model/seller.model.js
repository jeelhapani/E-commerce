const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        shopName: {
            type: String,
            required: true
        },
        wallet: {
            type: Number,
            default: 0,
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("seller", sellerSchema);
