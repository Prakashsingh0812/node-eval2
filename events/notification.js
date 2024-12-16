const EventEmitter = require("events");

const redisClient =require("../config/redis");

class NotificationService extends EventEmitter{

    constructor(){
        super();
        this.on("doubtposted",this.handleDoubtPosted);
        this.on("doubtResponded",this.handleDoubtResponded);
    }

    async handleDoubtPosted(doubt){
        console.log("New Doubt posted",doubt);

        const message = `New doubt posted ${doubt.question}`;
        await redisClient.publish("Notification", message);
        console.log("Noti")
    }

    async handleDoubtResponded(response){
        console.log("Doubt responded", response);

        const message= `Your doubt has been answered ${response.answered}`
        await redisClient.publish("Notifiction", message)
        console.log("Noti")

    }
}

const notificationService =new NotificationService();

module.exports = notificationService;