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

  user: User;
  tmpPostDescription;

  imageFile;
  imageSrc;

  private userSubscription: Subscription;

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    this.userSubscription = this.dataService.loggedUser.subscribe(user => {
      this.user = user;

      this.user.posts.sort( (a, b) => {
        return a.createdAt < b.createdAt ? 1 : (a.createdAt > b.createdAt ? -1 : 0);
      });
    } );
  }

  displayPicture() {
    if (this.user.profileImageUrl) {
      return RESTAPI.photoServerUrl + this.user.profileImageUrl;
    } else {
      return this.defaultProfileImageUrl;
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


    this.http.post(RESTAPI.getCreatePostURL(), body).subscribe( (post: Post) => {
      this.user.posts.unshift(post);

      this.user.posts.sort( (a, b) => {
        return a.createdAt.localeCompare(b.createdAt);
      });
    });
  }

  getFullPhotoUrl(post: Post) {
    return RESTAPI.photoServerUrl + post.imageUrl;
  }

  getFollowers () {
    return this.user.followers === undefined ? 0 : this.user.followers.length;
  }

  getFollowing() {
    return this.user.following === undefined ? 0 : this.user.following.length;
  }

  getPostCount() {
    return this.user.posts === undefined ? 0 : this.user.posts.length;
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

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
