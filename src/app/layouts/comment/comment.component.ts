import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../shared/models/dto/comment.model';
import {RESTAPI} from '../../shared/rest-api-calls';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  defaultProfileImageUrl = 'https://scontent.fbeg1-1.fna.fbcdn.net/v/t1.0-9/10157211_10202990567340511_2368130898099636845_n.jpg?_nc_cat=106&_nc_ht=scontent.fbeg1-1.fna&oh=9313a64c8c3592781ce4608582a1f6ef&oe=5CC6D28E';

  @Input()
  comment: Comment;

  constructor() { }

  ngOnInit() {
  }

  getCommentDate() {
    const date = new Date(this.comment.createdAt);
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }

  getUserImageUrl() {
    if (this.comment.userImageUrl) {
      return RESTAPI.photoServerUrl + this.comment.userImageUrl;
    }

    return this.defaultProfileImageUrl;
  }

}
