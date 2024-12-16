const http = require("http");
const app = require("./app");

const socketIO = require("socket.io");

const redisClient = require("./config/redis");
const doubt = require("./models/doubt");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket)=>{
    console.log("New client Connected");

    socket.on("newDoubt", (doubt) => {
        socket.broadcast.emit("doubtPosted", doubt);

    })

    socket.on("disconnect", ()=>{
        console.log("client disconnected");

    })

});

server.listen(PORT, ()=>{
    console.log(`server started on ${PORT}`)
});
