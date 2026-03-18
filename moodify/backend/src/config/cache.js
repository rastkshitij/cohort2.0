const Redis = require("ioredis")

const redis = new Redis({
  host: process.env.RADIS_HOST,
  port: process.env.RADIS_PORT,
  password: process.env.RADIS_PASSWORD
})

redis.on("connect", () => {
  console.log("Connected to Redis")
})

redis.on("error", (err) => {
  console.log("Redis Error:", err)
})

module.exports = redis