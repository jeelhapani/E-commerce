const { productServices } = require("../services/index");
const { getRedis } = require("../helper/common/redis.client");
const redisClient = getRedis();


const { initRedisSubscriber } = require("../helper/common/redis.subscriber");
(async () => {
    setTimeout(async () => {
        await initRedisSubscriber();
    }, 1000);
})();


const RESERVED_KEY = "reserved:product";
const USERCARTKEY = `cart:`;
const TTLKEY = `cart:ttl:`;



module.exports = {

    createProduct: async(req, res) => {
        try {
            const req_data = req.body;

            const images = req.files.map(file => {
                return `upload/product/${file.filename}`
            });

            const productData = await productServices.createProduct({ seller: req.payload.userid, images, ...req_data });
            
            await redisClient.hSet(RESERVED_KEY, productData[0]._id.toString(), productData[0].quantity);

            return res.status(200).json({
                status: true,
                message: "Product create successfully",
                productData
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: "Internal server error"
            });
        }
    },

    manageProductCart: async(req, res) => {
        try {
            const { productId, quantity } = req.body;
            const userId = req.payload.userid;
            // const key = `cart:${userId}`;
            const key = `${USERCARTKEY}${userId}`;

            if (!quantity && quantity !== 0) {
                return res.status(400).json({ status: false, message: "Quantity must be greater than 0" });
            }
            
            const totalProductQTY = await redisClient.hGet(RESERVED_KEY, productId) || 0;

            const product = await productServices.getProduct(productId);
            if (!product) {
                return res.status(404).json({ status: false, message: "Product not found" });
            }

            const existingQty = await redisClient.hGet(key, productId);
            const newQty = existingQty ? parseInt(existingQty, 10) : 0;
            
            const finalQty = newQty + quantity;
            
            if (finalQty < 0) {
                return res.status(404).json({ status: false, message: "Invalid cart quantity." });
            }
            
            if (finalQty > 0 && finalQty > Number(totalProductQTY)) {
                return res.status(404).json({ status: false, message: "Product stock limit exceeded." });
            }
            
            const flipSign = quantity * -1
            await redisClient.hIncrBy(RESERVED_KEY, productId, flipSign);

            if (finalQty === 0) {
                await redisClient.hDel(key, productId);
                    await redisClient.del(`${TTLKEY}${userId}:${productId}`);
                
                return res.status(404).json({ 
                    status: false, 
                    message: "Product remove from cart.",
                    data: { productId, quantity: 0 } 
                });
            }
            
            await redisClient.hSet(key, productId, finalQty);

            await redisClient.set(`${TTLKEY}${userId}:${productId}`, quantity, {
                EX: 30
            });

            return res.status(200).json({
                status: true,
                message: quantity > 0 ? "Product quantity increase" : "Product quantity decrease",
                data: { productId, quantity: finalQty }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: "Internal server error"
            });
        }
    },

    getCart: async(req, res) => {
        try {
            const userId = req.payload.userid;
            
            const key = `${USERCARTKEY}${userId}`;
            
            const existingQty = await redisClient.hGetAll(key);
            
            const productIds = Object.keys(existingQty);
            if (productIds.length <= 0) {
                return res.status(404).json({ 
                    status: false, 
                    message: "Your card is empty."
                });
            }

            const productdetail = await productServices.getProductCard(productIds);
            
            let totalPrice = 0;
            const cartProduct = productdetail.map(product => {
                const pid = product._id.toString();
                const qty = Number(existingQty[pid]);
                const totQty = qty * product.price;
                totalPrice += totQty;

                return {
                    ...product.toObject(),
                    cartQty: qty,
                    totalPrice: totQty
                };
            });
            
            return res.status(200).json({
                status: true,
                message: "Card load successfully",
                totalPrice,
                cartProduct
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: "Internal server error"
            });

        }
    }

}