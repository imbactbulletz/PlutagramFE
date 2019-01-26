import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../shared/models/dto/user.model';
import {Subscription} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DataService} from '../../shared/services/data.service';
import {RESTAPI} from '../../shared/rest-api-calls';
import {Post} from '../../shared/models/dto/post.model';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit, OnDestroy {
  defaultProfileImageUrl = 'https://scontent.fbeg1-1.fna.fbcdn.net/v/t1.0-9/10157211_10202990567340511_2368130898099636845_n.jpg?_nc_cat=106&_nc_ht=scontent.fbeg1-1.fna&oh=9313a64c8c3592781ce4608582a1f6ef&oe=5CC6D28E';

  loggedUser: User;
  tmpPostDescription;
  tmpCommentContent;

  imageFile;
  imageSrc;

  private userSubscription: Subscription;

  constructor(private http: HttpClient, private dataService: DataService) {
  }

  ngOnInit() {
    this.userSubscription = new Subscription();

    this.userSubscription.add(this.dataService.loggedUser.subscribe(user => {
      this.loggedUser = user;
      if (this.loggedUser.posts) {
        this.loggedUser.posts.sort((a, b) => {
          return a.createdAt < b.createdAt ? 1 : (a.createdAt > b.createdAt ? -1 : 0);
        });
      }
    }));

    const params = new HttpParams()
      .set('id', this.loggedUser.id + '');
    this.http.get(RESTAPI.getUserByIdURL(), {params: params}).subscribe( (user: User) => {
      this.loggedUser = user;
      this.dataService.changeLoggedUser(user);
      if (this.loggedUser.posts) {
        this.loggedUser.posts.sort((a, b) => {
          return a.createdAt < b.createdAt ? 1 : (a.createdAt > b.createdAt ? -1 : 0);
        });
      }
    });
  }

  displayPicture() {
    if (this.loggedUser.profileImageUrl) {
      return RESTAPI.photoServerUrl + this.loggedUser.profileImageUrl;
    }

    return this.defaultProfileImageUrl;
  }

  onFileChanged(event) {
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

    this.http.post(RESTAPI.getCreatePostURL(), body).subscribe((post: Post) => {
      const params = new HttpParams()
        .set('id', this.loggedUser.id + '');
      this.http.get(RESTAPI.getUserByIdURL(), {params: params}).subscribe( (user: User) => {
        this.loggedUser = user;

        this.loggedUser.posts.sort((a, b) => {
          return a.createdAt < b.createdAt ? 1 : (a.createdAt > b.createdAt ? -1 : 0);
        });
      });
    });
  }

  postComment(post: Post) {
    const body = {
      'postId': post.id + '',
      'content': this.tmpCommentContent
    };

    this.http.post(RESTAPI.getPostCommentUrl(), body).subscribe( (recievedPost: Post) => {
      if (recievedPost) {
        console.log('recieved post' + JSON.stringify(recievedPost));

          if (this.loggedUser.posts) {
            for (let i = 0; i < this.loggedUser.posts.length; i++) {
              if (this.loggedUser.posts[i].id === recievedPost.id) {
                this.loggedUser.posts[i] = recievedPost;
                return;
              }
            }
          } else {
            if (this.loggedUser.sharedPosts) {
              for (let i = 0; i < this.loggedUser.sharedPosts.length; i++) {
                if (this.loggedUser.sharedPosts[i].id === recievedPost.id) {
                  this.loggedUser.sharedPosts[i] = recievedPost;
                  return;
                }
              }
            }
          }
      }
    });
  }

  getFullPhotoUrl(post: Post) {
    return RESTAPI.photoServerUrl + post.imageUrl;
  }

  getFollowers() {
      return this.loggedUser.followers === undefined ? 0 : this.loggedUser.followers.length;
  }

  getFollowing() {
      return this.loggedUser.following === undefined ? 0 : this.loggedUser.following.length;
  }

  getPostCount() {
      return this.loggedUser.posts === undefined ? 0 : this.loggedUser.posts.length;
  }

  getPostDate(post: Post) {
    const date = new Date(post.createdAt);
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }

  getPostLikes(post: Post) {
    return post.likes ? post.totalLikes : 0;
  }

  getPostComments(post: Post) {
    return post.comments ? post.totalComments : 0;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
