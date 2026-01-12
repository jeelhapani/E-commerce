const { getRedis } = require("./redis.client");

let subscriber = null;

async function initRedisSubscriber() {
    const redisClient = getRedis();

    if (!redisClient) {
        console.log("Redis client not ready, subscriber not started");
        return;
    }

    subscriber = redisClient.duplicate();

    subscriber.on("error", (err) => {
        console.log("Redis Subscriber Error", err);
    });

    await subscriber.connect();

    console.log("Redis subscriber connected");

    await subscribeToExpiryEvents();
}

const RESERVED_KEY = "reserved:product";
const USERCARTKEY = `cart:`;

async function subscribeToExpiryEvents() {
    const redisClient = getRedis(); // ✅ FIX

    await subscriber.pSubscribe("__keyevent@0__:expired", async (expiredKey) => {

        // console.log("Expired Key:", expiredKey);

        if (!expiredKey.startsWith("cart:ttl:")) return;

        const [, , userId, productId] = expiredKey.split(":");

        // console.log("User:", userId);
        // console.log("Product:", productId);

        const cartKey = `${USERCARTKEY}${userId}`;

        const qty = await redisClient.hGet(cartKey, productId);
        if (!qty) return;

        await redisClient.hDel(cartKey, productId);
        await redisClient.hIncrBy(RESERVED_KEY, productId, Number(qty));

        console.log(`⏳ Auto released ${qty} stock for product ${productId}`);
    });
}

module.exports = { initRedisSubscriber };