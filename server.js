var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const http = require('http');
const server = http.Server(app);
let socketIO = require('socket.io')
const io = socketIO(server);
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

require('./server/config/mongoose.js')(app)
require('./server/models/chatroom.js')(app)
require('./server/config/routes.js')(app)

var users = 0;
io.on('connection', function(socket){
    users++;
    io.sockets.emit('broadcast', {sender: "System", message: "Someone has joined! "+users+ "users connected"})
    console.log('user connected');

    socket.on('good-bye',(username)=>{
        console.log(username,"disconnected");
        users--;
        io.sockets.emit('broadcast', {sender: "System",message: username+" has left the chat"});
    });

    socket.on('new-message',(msg) => {
        console.log("Emitting message:",msg)
        io.sockets.emit('message-posted',msg);
    })
})
server.listen(port,()=>{
    console.log(`started on port: ${port}`);
})


app.listen(8000, function() {
    console.log("listening on port 8000");
})
    