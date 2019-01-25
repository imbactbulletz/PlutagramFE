import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../shared/models/dto/user.model';
import {Subscription} from 'rxjs';
import {DataService} from '../../shared/services/data.service';
import {RESTAPI} from '../../shared/rest-api-calls';
import {HttpClient} from '@angular/common/http';
import {Post} from '../../shared/models/dto/post.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  defaultProfileImageUrl = 'https://scontent.fbeg1-1.fna.fbcdn.net/v/t1.0-9/10157211_10202990567340511_2368130898099636845_n.jpg?_nc_cat=106&_nc_ht=scontent.fbeg1-1.fna&oh=9313a64c8c3592781ce4608582a1f6ef&oe=5CC6D28E';

  loggedUser: User;
  visitedUser: User;
  tmpPostDescription;

  imageFile;
  imageSrc;

  private userSubscription: Subscription;

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    this.userSubscription = new Subscription();

    this.userSubscription.add(this.dataService.loggedUser.subscribe(user => {
      this.loggedUser = user;

      if (this.loggedUser.posts) {
        this.loggedUser.posts.sort( (a, b) => {
          return a.createdAt < b.createdAt ? 1 : (a.createdAt > b.createdAt ? -1 : 0);
        });
      }
    } ));

    this.userSubscription.add(this.dataService.visitedUser.subscribe( visitedUser => {
        this.visitedUser = visitedUser;

      console.log(JSON.stringify(this.visitedUser));
      if (this.visitedUser.posts) {
        this.visitedUser.posts.sort( (a, b) => {
          return a.createdAt < b.createdAt ? 1 : (a.createdAt > b.createdAt ? -1 : 0);
        });
      }
    }));
  }

  displayPicture() {
    if (this.visitedUser) {
      if (this.visitedUser.profileImageUrl) {
        return RESTAPI.photoServerUrl + this.visitedUser.profileImageUrl;
      } else {
          return this.defaultProfileImageUrl;
      }
    }

    if (this.loggedUser.profileImageUrl) {
        return RESTAPI.photoServerUrl + this.loggedUser.profileImageUrl;
      }

  }

  onFileChanged(event) {
    console.log('File changed!');
    this.imageFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.imageFile);
  }

  post() {
    const body = {
      'description': this.tmpPostDescription
    };

    body['image'] = this.imageSrc.slice('data:image/png;base64,'.length, this.imageSrc.length);


    this.loggedUser.posts.sort( (a, b) => {
      return a.createdAt < b.createdAt ? 1 : (a.createdAt > b.createdAt ? -1 : 0);
    });
  }

  getFullPhotoUrl(post: Post) {
    return RESTAPI.photoServerUrl + post.imageUrl;
  }

  getFollowers () {
    if (this.visitedUser) {
      return this.visitedUser.followers === undefined ? 0 : this.visitedUser.followers.length;
    } else {
      return this.loggedUser.followers === undefined ? 0 : this.loggedUser.followers.length;
    }
  }

  getFollowing() {
    if (this.visitedUser) {
      return this.visitedUser.following === undefined ? 0 : this.visitedUser.following.length;
    } else {
      return this.loggedUser.following === undefined ? 0 : this.loggedUser.following.length;
    }
  }

  getPostCount() {
    if (this.visitedUser) {
      return this.visitedUser.posts === undefined ? 0 : this.visitedUser.posts.length;
    } else {
      return this.loggedUser.posts === undefined ? 0 : this.loggedUser.posts.length;
    }
  }

  getPostDate(post: Post) {
    const date = new Date(post.createdAt);
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }

  getPostLikes(post: Post) {
    return post.likes === undefined ? 0 : post.likes;
  }

  getPostComments(post: Post) {
    return post.comments === undefined ? 0 : post.comments.length;
  }

  sameUser() {
    if (!this.visitedUser) {
      return true;
    } else {
      return false;
    }
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
