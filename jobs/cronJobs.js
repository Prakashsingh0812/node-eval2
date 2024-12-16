const cron = require("node-cron");

const redisClient = require("../config/redis");

cron.schedule("0 0 * * *", async ()=>{
    const summary = await generateDailySummary();
    redisClient.set("daily_summary", JSON.stringify(summary), {Ex:86400});
    console.log("daily summary")

})

const generateDailySummary = async()=>{
    return {activeUsers: 100, newDoubts:50};
};

