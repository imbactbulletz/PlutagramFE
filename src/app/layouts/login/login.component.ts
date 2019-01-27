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
        console.log('LOGIN RESPONSE: ' + JSON.stringify(response));
        if (response) {
          if (response.token) {
            localStorage.setItem('X-AUTH-TOKEN', response.token);
            this.dataService.changeLoggedUser(response.user);

            if (response.postsOfFriends) {
              this.dataService.changePostsOfFriends(response.postsOfFriends);
            }
            if (response.chatChannels) {
              console.log('Received cchannels: ' + response.chatChannels);

              for (let i = 0; i < response.chatChannels.length; i++) {
                response.chatChannels[i].messages.sort((a, b) => {
                  return b.date < a.date ? 1 : (b.date > a.date ? -1 : 0);
                });
              }

              this.dataService.changeChatChannels(response.chatChannels);
            }
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
