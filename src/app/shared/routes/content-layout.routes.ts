import { Routes } from '@angular/router';
import {LoginComponent} from '../../layouts/login/login.component';
import {RegisterComponent} from '../../layouts/register/register.component';
import {ActivateComponent} from '../../layouts/activate/activate.component';
import {HomeComponent} from '../../layouts/home/home.component';
import {SettingsComponent} from '../../layouts/settings/settings.component';
import {AuthGuard} from '../../core/guards/auth.guard';
import {ProfileComponent} from '../../layouts/profile/profile.component';
import {SearchedUsersComponent} from '../../layouts/searched.users/searched.users.component';
import {MyprofileComponent} from '../../layouts/myprofile/myprofile.component';
import {ChatComponent} from '../../layouts/chat/chat.component';

export const content_routes: Routes = [
  {
    path: 'signin',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'activate',
    component: ActivateComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'myprofile',
    component: MyprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    component: SearchedUsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
];
