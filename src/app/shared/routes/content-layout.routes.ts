import { Routes } from '@angular/router';
import {LoginComponent} from '../../layouts/login/login.component';
import {RegisterComponent} from '../../layouts/register/register.component';
import {ActivateComponent} from '../../layouts/activate/activate.component';
import {HomeComponent} from '../../layouts/home/home.component';

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
    component: HomeComponent
  }
];
