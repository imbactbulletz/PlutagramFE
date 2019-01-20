import {Component, OnInit, ViewChild} from '@angular/core';
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

  @ViewChild('modal') modal: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  register() {
    const body = {
      'email': this.email,
      'username': this.username,
      'password': this.password
    };

    this.http.post(RESTAPI.getSignUpURL(), body).subscribe(
      (response: RegisterDTO) => {
        if (response != null) {
          this.modal.show('Successfully registered! We\'ve sent you an activation link to your inbox.');
        }
      }
    );
  }


}
