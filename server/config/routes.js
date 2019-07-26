const chatrooms = require('../controllers/controllers.js')
const path = require('path');

module.exports = function(app){
    app.post("/api/user/new",chatrooms.createUser);
    app.get('/api/user/self/:id',chatrooms.getCurrentUser);
    app.delete('/api/user/self/:id',chatrooms.removeUser);
    app.post('/api/chatrooms/new',chatrooms.createRoom);
    app.get('/api/chatrooms', chatrooms.getRooms)
    app.get('/api/chatrooms/:room_id/user/:user_id',chatrooms.joinRoom);
    app.post('/api/chatrooms/leave',chatrooms.leaveRoom);
    app.get('/api/chatrooms/:room_id',chatrooms.getRoom);
    app.post('/api/chatrooms/:room_id',chatrooms.newMessage)
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve('./public/dist/public/index.html'))
    })
}