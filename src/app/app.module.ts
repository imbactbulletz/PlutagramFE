import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './layouts/header/header.component';
import { LoginComponent } from './layouts/login/login.component';
import { RegisterComponent } from './layouts/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './layouts/modal/modal.component';
import {CoreModule} from './core/core.module';
import { ActivateComponent } from './layouts/activate/activate.component';
import { HomeComponent } from './layouts/home/home.component';
import { SettingsComponent } from './layouts/settings/settings.component';
import { ProfileComponent } from './layouts/profile/profile.component';
import {SearchedUsersComponent} from './layouts/searched.users/searched.users.component';
import { MyprofileComponent } from './layouts/myprofile/myprofile.component';
import { CommentComponent } from './layouts/comment/comment.component';
import {SafePipe} from './shared/safe.pipe';
import { ChatComponent } from './layouts/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ModalComponent,
    ActivateComponent,
    HomeComponent,
    SettingsComponent,
    ProfileComponent,
    SearchedUsersComponent,
    MyprofileComponent,
    CommentComponent,
    SafePipe,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule.forRoot()
  ],
  entryComponents: [ ModalComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
