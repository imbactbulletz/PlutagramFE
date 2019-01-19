import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RESTAPI} from '../../shared/rest-api-calls';
import {RegisterDTO} from '../../shared/models/dto/register.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private email;
  private username;
  private password;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  register() {
    const body = {
      'email': this.email,
      'username': this.username,
      'password': this.password
    };

    console.log(RESTAPI.getSignUpURL());

    this.http.post(RESTAPI.getSignUpURL(), body).subscribe(
      (response: RegisterDTO ) => {
          if (response != null) {
            alert('Successfully registered! Check your email for activation link!');
          }
      }
    );
  }
}
