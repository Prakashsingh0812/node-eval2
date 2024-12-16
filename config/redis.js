const Redis = require("ioredis");

const redisClient = new Redis({

    host: process.env.REDIS_HOST|| "127.0.0.1",
    port : process.env.REDIS_PORT || 6379,
    retryStrategy(times){
        return Math.min(times * 50, 2000);

    }
})

redisClient.on("connect", ()=>{
    console.log("connected to Redis")

})

redisClient.on("error", (err)=>{
    console.log("Redis err", err)
})

module.exports = redisClient