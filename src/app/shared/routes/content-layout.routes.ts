import { Routes } from '@angular/router';
import {LoginComponent} from '../../layouts/login/login.component';
import {RegisterComponent} from '../../layouts/register/register.component';

export const content_routes: Routes = [
  {
    path: 'signin',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  }
];
