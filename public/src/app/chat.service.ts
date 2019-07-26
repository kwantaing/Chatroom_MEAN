import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://localhost:3000';
  private socket;
  constructor() { 
    this.socket = io(this.url);
  }

  public sendMessage(message){
    this.socket.emit('new-message',message);
  }

  public logOut(username){
    this.socket.emit('good-bye',username);
  }

  public getMessages = () => {
      return Observable.create((observer) => {
        this.socket.once('message-posted',function(msg){
          observer.next(msg);
      }); 
        this.socket.once('broadcast', function(msg){
          observer.next(msg);
        })
      
      return()=>{
        this.socket.disconnect();
      }
    })
  }
}
