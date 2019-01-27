import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/dto/user.model';
import {Post} from '../../shared/models/dto/post.model';
import {DataService} from '../../shared/services/data.service';
import {Subscription} from 'rxjs';
import {RESTAPI} from '../../shared/rest-api-calls';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tmpCommentContent: string;

  loggedUser: User;
  postsOfFriends: Post[];

  subscription = new Subscription();

  constructor(private dataService: DataService, private http: HttpClient) {

  }

  ngOnInit() {
    this.subscription.add(this.dataService.postsOfFriends.subscribe( (posts: Post[]) => {
      this.postsOfFriends = posts;
    } ));

    this.subscription.add(this.dataService.loggedUser.subscribe( (loggedUser: User) => {
      this.loggedUser = loggedUser;
    }));

    this.http.get(RESTAPI.getFriendPosts()).subscribe( (posts: Post[]) => {
      this.postsOfFriends = posts;
      this.dataService.changePostsOfFriends(posts);
    } );
  }

  like(post: Post) {
    const params = new HttpParams()
      .set('postId', post.id + '');

    this.http.post(RESTAPI.getLikePostURL(), params).subscribe((recievedPost: Post) => {
      console.log('Recieved post:' + JSON.stringify(recievedPost));

      for (let i = 0; i < this.postsOfFriends.length; i++) {
        if (this.postsOfFriends[i].id === recievedPost.id) {
          this.postsOfFriends[i] = recievedPost;
        }
      }
    });
  }

  unlike(post: Post) {
    console.log('Unliking the post!');
    const params = new HttpParams()
      .set('postId', post.id + '');

    this.http.post(RESTAPI.getUnlikePostURL(), params).subscribe((recievedPost: Post) => {
      for (let i = 0; i < this.postsOfFriends.length; i++) {
        if (this.postsOfFriends[i].id === recievedPost.id) {
          this.postsOfFriends[i] = recievedPost;
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
        for (let i = 0; i < this.postsOfFriends.length; i++) {
          if (this.postsOfFriends[i].id === recievedPost.id) {
            this.postsOfFriends[i] = recievedPost;
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

  hasFriendPosts() {
    if (!this.postsOfFriends) {
      return false;
    }

    if (this.postsOfFriends.length === 0) {
      return false;
    }

    return true;
  }
}
