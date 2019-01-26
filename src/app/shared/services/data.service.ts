import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {User} from '../models/dto/user.model';
import {Post} from '../models/dto/post.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private loggedUserSource = new BehaviorSubject<User>(null);
  private visitedUserSource = new BehaviorSubject<User>(null);
  private searchedUsersSource = new BehaviorSubject<User[]>(null);
  private postsOfFriendsSource = new BehaviorSubject<Post[]>(null);
  public loggedUser = this.loggedUserSource.asObservable();
  public visitedUser = this.visitedUserSource.asObservable();

  public searchedUsers = this.searchedUsersSource.asObservable();
  public postsOfFriends = this.postsOfFriendsSource.asObservable();

  constructor() {
  }

  changeLoggedUser(user: User) {
    this.loggedUserSource.next(user);
  }

  changeVisitedUser(user: User) {
    this.visitedUserSource.next(user);
  }

  changeSearchedUsers(users: User[]) {
    this.searchedUsersSource.next(users);
  }

  changePostsOfFriends(posts: Post[]) {
    this.postsOfFriendsSource.next(posts);
  }
}
