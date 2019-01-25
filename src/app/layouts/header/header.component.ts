import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../shared/services/data.service';
import {User} from '../../shared/models/dto/user.model';
import {Subscription} from 'rxjs';
import {RESTAPI} from '../../shared/rest-api-calls';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  defaultProfileImageUrl = 'https://scontent.fbeg1-1.fna.fbcdn.net/v/t1.0-9/10157211_10202990567340511_2368130898099636845_n.jpg?_nc_cat=106&_nc_ht=scontent.fbeg1-1.fna&oh=9313a64c8c3592781ce4608582a1f6ef&oe=5CC6D28E';
  user: User;
  userSubscription: Subscription;

  searchBarValue: string;
  constructor(private http: HttpClient, private dataService: DataService, private router: Router ) {}

  ngOnInit() {
    this.userSubscription = this.dataService.loggedUser.subscribe(user => this.user = user);
  }

  isLoggedIn() {
    const token = localStorage.getItem('X-AUTH-TOKEN');

    if (token) {
      return true;
    }

    return false;
  }

  displayPicture() {
    if (this.user.profileImageUrl) {
      return RESTAPI.photoServerUrl + this.user.profileImageUrl;
    } else {
      return this.defaultProfileImageUrl;
    }
  }

  searchUsers() {

    this.http.get(RESTAPI.getSearchUsersURL(), ).subscribe( (page: any) => {
      const filteredUsers = [];

      page.content.forEach( (user) => {
        if (user.username.includes(this.searchBarValue)) {
          filteredUsers.push(user);
        }
      });

      this.dataService.changeSearchedUsers(filteredUsers);
      this.router.navigateByUrl('search');
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
