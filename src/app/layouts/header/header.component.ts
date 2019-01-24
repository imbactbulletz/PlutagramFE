import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../shared/services/data.service';
import {User} from '../../shared/models/dto/user.model';
import {Subscription} from 'rxjs';
import {RESTAPI} from '../../shared/rest-api-calls';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  defaultProfileImageUrl = 'https://scontent.fbeg1-1.fna.fbcdn.net/v/t1.0-9/10157211_10202990567340511_2368130898099636845_n.jpg?_nc_cat=106&_nc_ht=scontent.fbeg1-1.fna&oh=9313a64c8c3592781ce4608582a1f6ef&oe=5CC6D28E';
  user: User;
  userSubscription: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.userSubscription = this.dataService.user.subscribe(user => this.user = user);
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

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
