const productModel = require("../model/product.model");
const productCartModel = require("../model/productCard.model");

module.exports = {

    createProduct: async(req_data) => {
        return new Promise(async (resolve) => {
            await productModel.insertOne(req_data);
            return resolve(
                await productModel.find({ ...req_data }, { __v: 0 })
            )
        });
    },

    getProduct: async(productId) => {
        return new Promise(async (resolve) => {
            return resolve(
                await productModel.findOne({ _id: productId })
            )
        });
    },

    getProductCard: async(cardProductId) => {
        return new Promise(async (resolve) => {
            return resolve(
                await productModel.find(
                    {
                        _id: { $in: cardProductId }
                
                    },
                    {
                        _id: 1,
                        images: 1,
                        title: 1,
                        price: 1,
                    }
                )
            )
        });
    }

}