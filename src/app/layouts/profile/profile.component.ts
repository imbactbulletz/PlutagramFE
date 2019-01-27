import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../shared/models/dto/user.model';
import {Subscription} from 'rxjs';
import {DataService} from '../../shared/services/data.service';
import {RESTAPI} from '../../shared/rest-api-calls';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Post} from '../../shared/models/dto/post.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  defaultProfileImageUrl = 'https://scontent.fbeg1-1.fna.fbcdn.net/v/t1.0-9/10157211_10202990567340511_2368130898099636845_n.jpg?_nc_cat=106&_nc_ht=scontent.fbeg1-1.fna&oh=9313a64c8c3592781ce4608582a1f6ef&oe=5CC6D28E';
  tmpCommentContent: string;
  visitedUser: User;
  loggedUser: User;

  following: boolean;

  imageFile;
  imageSrc;

  private userSubscription: Subscription;

  constructor(private http: HttpClient, private dataService: DataService) {
  }

  ngOnInit() {
    this.userSubscription = new Subscription();

    this.userSubscription.add(this.dataService.loggedUser.subscribe(loggedUser => {
      this.loggedUser = loggedUser;
    }));

    this.userSubscription.add(this.dataService.visitedUser.subscribe(visitedUser => {
      this.visitedUser = visitedUser;

      if (this.visitedUser.followers) {
        this.visitedUser.followers.forEach((follower: User) => {
          if (this.loggedUser.username === follower.username) {
            this.following = true;
            return;
          }
        });
      }

      if (this.visitedUser && this.visitedUser.posts) {
        this.visitedUser.posts.sort((a, b) => {
          return a.createdAt < b.createdAt ? 1 : (a.createdAt > b.createdAt ? -1 : 0);
        });
      }
    }));

    const params = new HttpParams()
      .set('id', this.visitedUser.id + '');


    this.http.get(RESTAPI.getUserByIdURL(), {params: params}).subscribe((user: User) => {

      this.visitedUser = user;
    });
  }

  displayPicture() {
    if (this.visitedUser) {
      if (this.visitedUser.profileImageUrl) {
        return RESTAPI.photoServerUrl + this.visitedUser.profileImageUrl;
      }
    }

    return this.defaultProfileImageUrl;
  }

  onFileChanged(event) {
    this.imageFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.imageFile);
  }

  followUser() {

    let params = new HttpParams()
      .set('userId', this.visitedUser.id + '');

    this.http.post(RESTAPI.getFollowUserURL(), null, {params: params}).subscribe((successful: boolean) => {
      this.following = successful;
      params = new HttpParams()
        .set('id', this.visitedUser.id + '');

      this.http.get(RESTAPI.getUserByIdURL(), {params: params}).subscribe((user: User) => {
        console.log('Got user on follow: ' + JSON.stringify(user));
        this.visitedUser = user;

        if (this.visitedUser.followers) {
          this.visitedUser.followers.forEach((follower: User) => {
            if (this.loggedUser.username === follower.username) {
              this.following = true;
              return;
            }
          });
        }
        this.dataService.changeVisitedUser(user);
      });
    });

  }

  unfollowUser() {
    let params = new HttpParams()
      .set('userId', this.visitedUser.id + '');

    this.http.post(RESTAPI.getUnfollowUserURL(), null, {params: params}).subscribe((successful: boolean) => {
      this.following = !successful;

      params = new HttpParams()
        .set('id', this.visitedUser.id + '');

      this.http.get(RESTAPI.getUserByIdURL(), {params: params}).subscribe((user: User) => {
        console.log('Got user on unfollow: ' + JSON.stringify(user));
        this.visitedUser = user;

        if (this.visitedUser.followers) {
          let foundFollower = false;
          this.visitedUser.followers.forEach((follower: User) => {
            if (this.loggedUser.username === follower.username) {
              foundFollower = true;
              return;
            }
          });
          this.following = foundFollower;
        }
        this.dataService.changeVisitedUser(user);
      });
    });
  }

  like(post: Post) {
    const params = new HttpParams()
      .set('postId', post.id + '');

    this.http.post(RESTAPI.getLikePostURL(), params).subscribe((recievedPost: Post) => {
      console.log('Recieved post:' + JSON.stringify(recievedPost));

      for (let i = 0; i < this.visitedUser.posts.length; i++) {
        if (this.visitedUser.posts[i].id === recievedPost.id) {
          this.visitedUser.posts[i] = recievedPost;
        }
      }
    });
  }

  unlike(post: Post) {
    console.log('Unliking the post!');
    const params = new HttpParams()
      .set('postId', post.id + '');

    this.http.post(RESTAPI.getUnlikePostURL(), params).subscribe((recievedPost: Post) => {
      for (let i = 0; i < this.visitedUser.posts.length; i++) {
        if (this.visitedUser.posts[i].id === recievedPost.id) {
          this.visitedUser.posts[i] = recievedPost;
        }
      }
    });
  }

  sharePost(post: Post) {
    const params = new HttpParams()
      .set('postId', post.id + '');

    this.http.post(RESTAPI.getSharePostURL(), params).subscribe(
      (recievedPost: Post) => {
        if (recievedPost) {
          post.shared = true;
        }
      }
    );
  }

  postComment(post: Post) {
    const body = {
      'postId': post.id + '',
      'content': this.tmpCommentContent
    };

    console.log('Posting comment: ' + JSON.stringify(body));
    this.http.post(RESTAPI.getPostCommentUrl(), body).subscribe( (recievedPost: Post) => {
      if (recievedPost) {
        for (let i = 0; i < this.visitedUser.posts.length; i++) {
          if (this.visitedUser.posts[i].id === recievedPost.id) {
            this.visitedUser.posts[i] = recievedPost;
          }
        }
      }
    });
  }

  likedPost(post: Post) {
    if (!post.likes) {
      console.log('post has no likes');
      return false;
    }

    for (let i = 0; i < post.likes.length; i++) {
      if (post.likes[i] === this.loggedUser.username) {
        return true;
      }
    }
    return false;
  }

  sharedPost(post: Post) {
    if (this.loggedUser.sharedPosts) {
      for (let i = 0; i < this.loggedUser.sharedPosts.length; i++) {
        if (this.loggedUser.sharedPosts[i].id === post.id) {
          return true;
        }
      }
    }

    return false;
  }

  getFullPhotoUrl(post: Post) {
    return RESTAPI.photoServerUrl + post.imageUrl;
  }

  getFollowers() {
    return this.visitedUser.followers ? this.visitedUser.followers.length : 0;
  }

  getFollowing() {
    return this.visitedUser.following ? this.visitedUser.following.length : 0;
  }

  getPostCount() {
    return this.visitedUser.posts ? this.visitedUser.posts.length : 0;
  }

  getPostDate(post: Post) {
    const date = new Date(post.createdAt);
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }

  getPostLikes(post: Post) {
    return post.totalLikes ? post.totalLikes : 0;
  }

  getPostComments(post: Post) {
    return post.totalComments ? post.totalComments : 0;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
