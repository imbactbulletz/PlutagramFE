import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {User} from '../models/dto/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userSource = new BehaviorSubject<User>(null);
  public user = this.userSource.asObservable();

  constructor() {
  }

  changeUser(user: User) {
    this.userSource.next(user);
  }
}
