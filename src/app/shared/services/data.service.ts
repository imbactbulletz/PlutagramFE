import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {User} from '../models/dto/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private loggedUserSource = new BehaviorSubject<User>(null);
  private visitedUserSource = new BehaviorSubject<User>(null);
  private searchedUsersSource = new BehaviorSubject<User[]>(null);

  public loggedUser = this.loggedUserSource.asObservable();
  public visitedUser = this.visitedUserSource.asObservable();

  public searchedUsers = this.searchedUsersSource.asObservable();

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
}
