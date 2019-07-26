import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { LobbyComponent } from './lobby/lobby.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "user", component: UserComponent},
  {path: "chatrooms/lobby/user/:id", component: LobbyComponent},
  {path: "chatrooms/:room_id/:user_id", component: ChatroomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
