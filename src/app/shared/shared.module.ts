import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {AppComponent} from '../app.component';
import {HeaderComponent} from '../layouts/header/header.component';
import {LoginComponent} from '../layouts/login/login.component';
import {RegisterComponent} from '../layouts/register/register.component';
import {ModalComponent} from '../layouts/modal/modal.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [
    MDBBootstrapModule
  ]
})
export class SharedModule { }
