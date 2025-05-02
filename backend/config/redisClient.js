const { createClient } = require("redis");

let redisClient;

async function connectRedis() {
  if (redisClient) return redisClient;

  redisClient = createClient({
    url: process.env.UPSTASH_REDIS_REST_URL,
    password: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  redisClient.on("error", (err) => {
    console.error("Redis Client Error:", err);
  });

  await redisClient.connect();
  console.log("✅ Connected to Upstash Redis");

  return redisClient;
}

const redisClientPromise = connectRedis();

module.exports = {
  redisClientPromise,
};
