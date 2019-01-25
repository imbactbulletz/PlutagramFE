import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RESTAPI } from '../../shared/rest-api-calls';
import {LoginDTO} from '../../shared/models/dto/login.dto';
import {Router} from '@angular/router';
import {DataService} from '../../shared/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  private email: string;
  private password: string;

  @ViewChild('modal') modal: any;

  constructor(private http: HttpClient, private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.modal.setProperties(false, false);
  }

  login() {
    const body = {
      'email': this.email,
      'password': this.password
    };

    this.http.post(RESTAPI.getSignInURL(), body).subscribe(

      (response: LoginDTO) => {
        if (response) {
          if (response.token) {
            localStorage.setItem('X-AUTH-TOKEN', response.token);
            this.dataService.changeLoggedUser(response.user);
            this.router.navigateByUrl('home');
          }
        } else {
            this.modal.show('Could not log you in.');
        }
    },
      error => {
        this.modal.show(error);
      }
    );
  }
}
