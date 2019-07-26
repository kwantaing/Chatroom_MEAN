import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../chat.service';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  messages: Array<Object>= [];
  constructor(public _chatService: ChatService, private _httpService: HttpService, private _route:ActivatedRoute, private _router: Router) { }
  user : any;
  user_id: any;
  room: any;
  room_id: any;
  newMessage:any;
  ngOnInit(){
    this.getID();
    this.getUser();
    this.getRoom();
    this.getMessages();
  }

  logout(){
    let Observable = this._httpService.logoutUser(this.user_id);
    Observable.subscribe(data => {
      console.log("logging out...",data);
      this._chatService.logOut(this.user.username);
      this._router.navigate(['/'])
    })
  }
  getID(){
    let Observable = this._route.params;
    Observable.subscribe(data => {
      console.log(data);
      this.user_id = data["user_id"];
      this.room_id = data["room_id"]
    })
  }
  getUser(){
    let Observable = this._httpService.getCurrentUser(this.user_id);
    Observable.subscribe(data => {
      this.user = data["user"]
      })
    }
    getRoom(){
      let Observable = this._httpService.getRoom(this.room_id);
      Observable.subscribe(data => {
        this.room = data["room"]
      })

    }
    leaveRoom(){
      let Observable = this._httpService.leaveRoom({room_id: this.room_id,user_id: this.user_id});
      Observable.subscribe(data => {
        this.logout();
      })
    }
    sendMessage(newMessage){
      var msg = {sender: this.user.username, message: newMessage}
      let Observable = this._httpService.newMessage(this.room_id,msg);
      Observable.subscribe(data => {
        console.log("success!")
      })
    }
    sendmsg(newMessage){
      var msg = {sender: this.user.username, message: newMessage}
      this._chatService.sendMessage(msg);
      this.newMessage = "";
      this.ngOnInit();
    }
    getMessages(){
      let Observable =this._chatService.getMessages();
      Observable.subscribe(msg => {
        this.messages.push(msg);
      })
    }
}
