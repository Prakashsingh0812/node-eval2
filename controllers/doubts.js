const Doubt = require("../models/doubt");
const redisClient=  require("../config/redis");

exports.postDoubt = async (req,res) =>{
    const {studentId, question} = req.body;
    const doubt = new Doubt ({studentId, question});
    await doubt.save();

    redisClient.lPush("recent_doubts", JSON.stringify(doubt));

    redisClient.del("unanswered_doubts");

    require("../events/notification").notifyInstructor(doubt);

    res.status(201).send({message: "Doubt posted succesfully"}, doubt);

};

exports.getDoubts = async (req,res) =>{
    let unansweredDoubts = await redisClient.get("unanswered_doubts");

    if(!unansweredDoubts){
        unansweredDoubts = await Doubt.find({status:"Unanswered"})

        redisClient.set("unanswered_doubts", JSON.stringify(unansweredDoubts), {EX:600});


    }else{
        unansweredDoubts = JSON.parse(unansweredDoubts);

    }
    res.send(unansweredDoubts);
}

exports.respondToDoubt = async (req, res) =>{

    const { id } = req.params;
    await Doubt.findByIdAndUpdate(id,{status:"answered"});
    redisClient.del("unanswered_doubts")

    res.send({message:"Doubt res successfully"})
}

