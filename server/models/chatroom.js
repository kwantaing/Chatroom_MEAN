const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const uniqueRoom = require('mongoose-unique-validator');

module.exports = function(app){
    var UserSchema = new mongoose.Schema({
        username: { type: String, required:[true,"A username is required."], minlength: [3,"A username with at least 3 characters is required"],unique:true, sparse:true}
    },{timestamps:true})

    var MessageSchema = new mongoose.Schema({
        sender: {type: String, required:true},
        message: {type: String, required: true}
    })

    var ChatroomSchema = new mongoose.Schema({
        room_name : { type: String},
        users : [UserSchema],
        messages : [MessageSchema]
    },{timestamps:true})

    UserSchema.plugin(unique, {message: "A person is already chatting with that username!"});
    // ChatroomSchema.plugin(uniqueRoom, {message: "A chatroom with that name already exists!"});

    mongoose.model('Message',MessageSchema);
    mongoose.model('User',UserSchema);
    mongoose.model('Chatroom',ChatroomSchema);
}