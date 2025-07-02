const Redis = require("ioredis");

const redisClient = new Redis(process.env.REDIS_URL);

redisClient.on("connect", () => console.log("Connected to Upstash Redis"));
redisClient.on("error", (err) => console.error("Redis error:", err));

async function getCachedAnalysis(key) {
  return await redisClient.get(key);
}

async function setCachedAnalysis(key, value) {
  await redisClient.set(key, value, "EX", 86400);
}

module.exports = {
  getCachedAnalysis,
  setCachedAnalysis,
};
