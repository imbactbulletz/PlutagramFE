import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../shared/models/dto/user.model';
import {Subscription} from 'rxjs';
import {DataService} from '../../shared/services/data.service';
import {RESTAPI} from '../../shared/rest-api-calls';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-searched.users',
  templateUrl: './searched.users.component.html',
  styleUrls: ['./searched.users.component.scss']
})
export class SearchedUsersComponent implements OnInit, OnDestroy {
  defaultProfileImageUrl = 'https://scontent.fbeg1-1.fna.fbcdn.net/v/t1.0-9/10157211_10202990567340511_2368130898099636845_n.jpg?_nc_cat=106&_nc_ht=scontent.fbeg1-1.fna&oh=9313a64c8c3592781ce4608582a1f6ef&oe=5CC6D28E';
  searchedUsers: User[];

  private subscription: Subscription;

  constructor(private dataService: DataService, private router: Router,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.subscription = this.dataService.searchedUsers.subscribe( searchedUsers => {
      this.searchedUsers = searchedUsers;
    });
  }

  displayProfileImage(user: User) {
    if (user.profileImageUrl) {
       return RESTAPI.photoServerUrl + user.profileImageUrl;
    } else {
       return this.defaultProfileImageUrl;
    }
  }

  visitUserProfile(user: User) {

    const params = new HttpParams()
      .set('id', user.id + '');


    this.http.get(RESTAPI.getUserByIdURL(), {params: params }).subscribe( (user1: User) => {
      this.dataService.changeVisitedUser(user1);
      this.router.navigateByUrl('profile');
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
