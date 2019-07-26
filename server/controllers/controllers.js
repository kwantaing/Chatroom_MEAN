const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const io = require('socket.io');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

User = mongoose.model('User');
Chatroom = mongoose.model('Chatroom');
Message = mongoose.model('Message')

module.exports = {
    createUser: function(req,res){

        User.create(req.body, function(err,user){
            if(err){
                res.json({error:err});
            }else{
                console.log("Controller:",user)
                res.json({user:user})
            }
        })
    },
    getCurrentUser : function(req,res){
        User.findOne({_id:req.params.id},function(err,user){
            if(err){
                res.json({error:err});
            }else{
                res.json({user:user});
            }
        })
    },
    removeUser : function(req,res){
        User.deleteOne({_id:req.params.id},function(err){
            if(err){
                res.json({error:err});
            }else{
                res.json({remove: "success"})
            }
        })
    },
    createRoom : function(req,res){
        Chatroom.create(req.body, function(err,room){
            if(err){
                res.json({error:err});
            }else{
                res.json({room:room});
                
            }
        })
    },
    getRooms : function(req,res){
        Chatroom.find({},function(err,chatrooms){
            if(err){
                res.json({error:err});
            }else{
                res.json({chatrooms:chatrooms})
            }
        })
    },
    joinRoom : function(req,res){
        User.findOne({_id:req.params.user_id},function(err,user){
            if(err){
                console.log("find user")
                res.json({error:err});
            }else{
                Chatroom.findOneAndUpdate({_id:req.params.room_id},{$push: {users: user}},function(err,chatroom){
                    if(err){
                        console.log("chatrrom push")
                        console.log("room id:",req.params.room_id)
                        res.json({error:err});
                    }else{
                        console.log("user:",user)
                        console.log(chatroom);
                        res.json({chatroom:chatroom});
                    }
                })
            }
        })
    },
    getRoom: function(req,res){
        Chatroom.findOne({_id:req.params.room_id},function(err,room){
            if(err){
                res.json({error:err});
            }else{
                res.json({room:room});
            }
        })
    },
    leaveRoom: function(req,res){
        console.log(req.body);
                Chatroom.updateOne({_id:req.body.room_id},{$pull: {users: {_id: req.body.user_id}}},function(err,chatroom){
                    if(err){
                        res.json({error:err});
                    }else{}
                        res.json({leaving:"success"})
                }
                );
    },
    newMessage : function(req,res){
        console.log("Message:",req.body);
        console.log("roomID:",req.params.room_id)
        Message.create(req.body, function(err,message){
            if(err){
                res.json({error:err});
            }else{
                Chatroom.updateOne({_id: req.params.room_id},{$push: {messages:message}},function(err, chatroom){
                    if(err){
                        Message.remove({_id:message._id})
                        res.json({error:err})
                    }else{
                        res.json({chatroom:chatroom})
                    }
                })
            }
        })
    }
}