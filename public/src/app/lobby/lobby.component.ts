import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Params, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor(private _httpService:HttpService, private _route: ActivatedRoute, private _router: Router) { }
  user : any;
  user_id: any;
  newChatroom: any;
  chatrooms: any;
  errors: any;

  ngOnInit() {
    this.newChatroom = {room_name: ""}
    this.getID();
    this.getUser();
    this.getRooms();
  }

  logout(){
    let Observable = this._httpService.logoutUser(this.user_id);
    Observable.subscribe(data => {
      console.log("logging out...",data);
      this._router.navigate(['/'])
    })
  }
  getID(){
    let Observable = this._route.params;
    Observable.subscribe(data => {
      console.log(data);
      this.user_id = data["id"];
    })
  }

  getUser(){
    let Observable = this._httpService.getCurrentUser(this.user_id);
    Observable.subscribe(data => {
      console.log("Current User: ",data);
      if(data["user"]){
        this.user = data["user"];
      }else{
        this.logout();
      }
    })
  }
  createRoom(newChatroom){
    let Observable = this._httpService.createRoom(newChatroom);
    Observable.subscribe(data => {
      console.log("Creating room...",data);
      if(data["error"]){
        this.errors = data["error"]["errors"];
      }else{
        var room = data["room"]["_id"];
        this.joinRoom(room);
      }
    })
  }
  getRooms(){
    let Observable = this._httpService.getRooms();
    Observable.subscribe(data => {
      console.log("Getting all rooms",data);
      this.chatrooms = data["chatrooms"];
    })
  }
  joinRoom(room){
    console.log(room);
    let Observable = this._httpService.joinRoom(room,this.user_id);
    Observable.subscribe(data => {
      console.log("Joining room...",data);
      this.getRooms();
      this._router.navigate(['chatrooms',room,this.user_id])
    })
  }

}
