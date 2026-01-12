const redis = require("redis");

let client = null;

async function connectRedis() {
    try {
        client = redis.createClient();

        client.on("connect", () => {
            console.log("Redis connected");
        });

        client.on("error", (err) => {
            console.log("Redis Error", err);
        });

        await client.connect();

    } catch (error) {
        console.log("Redis connection failed, app running without redis");
        client = null;
    }
}

connectRedis();

module.exports = {
    getRedis: () => client
};