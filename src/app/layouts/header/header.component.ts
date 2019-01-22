import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  isLoggedIn() {
    const token = localStorage.getItem('X-AUTH-TOKEN');

    if (token) {
      return true;
    }

    return false;
  }
}
