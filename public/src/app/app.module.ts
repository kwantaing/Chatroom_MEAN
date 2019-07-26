import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { HttpService } from './http.service';
import { LobbyComponent } from './lobby/lobby.component';
import { ChatService } from './chat.service';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    ChatroomComponent,
    LobbyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [HttpService,ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
