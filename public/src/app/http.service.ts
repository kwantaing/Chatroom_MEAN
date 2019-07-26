import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http:HttpClient) { }

  createUser(newUser){
    return this._http.post('/api/user/new',newUser);
  }
  getCurrentUser(id){
    return this._http.get(`/api/user/self/${id}`)
  }
  logoutUser(id){
    return this._http.delete(`/api/user/self/${id}`)
  }
  createRoom(newChatroom){
    console.log("SERVICE",newChatroom);
    return this._http.post('/api/chatrooms/new',newChatroom);
  }
  getRooms(){
    return this._http.get('/api/chatrooms');
  }
  joinRoom(room_id,user_id){
    return this._http.get(`/api/chatrooms/${room_id}/user/${user_id}`);
  }
  getRoom(room_id){
    return this._http.get(`/api/chatrooms/${room_id}`)
  }
  leaveRoom(info){
    return this._http.post(`/api/chatrooms/leave`,info);
  }
  newMessage(room_id,newMessage){
    console.log("room id:",room_id);
    console.log("new message:",newMessage)
    return this._http.post(`/api/chatrooms/${room_id}`,newMessage)
  }
}