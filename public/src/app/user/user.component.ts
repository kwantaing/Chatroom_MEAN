import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private _httpService: HttpService, private _route:ActivatedRoute, private _router: Router) { }
  newUser : any;
  errors: any;

  ngOnInit() {
    this.newUser= {username: ""};
  }
  onCreate(){
    let Observable = this._httpService.createUser(this.newUser);
    Observable.subscribe(data => {
      console.log("onCreate: ",data);
      if(data["error"]){
        this.errors = data["error"]["errors"];
      }else{
        this._router.navigate(['/chatrooms','lobby',"user",data["user"]["_id"]]);
      }
  })}

}
