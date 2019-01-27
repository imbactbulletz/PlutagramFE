import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatChannel} from '../../shared/models/dto/chat.channel.model';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../shared/services/data.service';
import {Subscription} from 'rxjs';
import {RESTAPI} from '../../shared/rest-api-calls';
import {Post} from '../../shared/models/dto/post.model';
import {Message} from '../../shared/models/dto/message.model';
import {User} from '../../shared/models/dto/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  defaultProfileImageUrl = 'https://scontent.fbeg1-1.fna.fbcdn.net/v/t1.0-9/10157211_10202990567340511_2368130898099636845_n.jpg?_nc_cat=106&_nc_ht=scontent.fbeg1-1.fna&oh=9313a64c8c3592781ce4608582a1f6ef&oe=5CC6D28E';

  chatChannels: ChatChannel[];
  selectedChatChannel: ChatChannel;
  tmpMessageContent;

  subscription: Subscription;


  loggedUser: User;

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    this.subscription = new Subscription();

    this.subscription.add(this.dataService.chatChannels.subscribe( (chatChannels) => {
      this.chatChannels = chatChannels;
    } ));

    this.subscription.add(this.dataService.loggedUser.subscribe( (user: User) => this.loggedUser = user));

    this.subscription.add(this.dataService.message.subscribe( (unreadMessage) => {
        if (unreadMessage) {
          for (let i = 0; i < this.chatChannels.length; i++) {
            if (this.chatChannels[i].uniqueName === unreadMessage.channel) {
              this.chatChannels[i].messages.push(unreadMessage);
            }
          }
        }
    }));
  }

  hasChatChannels() {
    if (this.chatChannels) {
      return true;
    }

    return false;
  }

  displayProfileImage(chatChannel: ChatChannel) {
    if (chatChannel.image) {
      return RESTAPI.photoServerUrl + chatChannel.image;
    }

    return this.defaultProfileImageUrl;
  }

  clickedChatChannel(chatChannel: ChatChannel, $event) {
    this.colorListItem($event);

    this.selectedChatChannel = chatChannel;
  }

  colorListItem($event) {
    const current = document.querySelector('.active');
    if (current) {
      current.classList.remove('active');
    }
    $event.target.classList.add('active');
  }

  getMessageDateAndTime(message: Message) {
    const date = new Date(message.date);
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + '.' +
      ' at ' + date.getHours() + ':' + date.getMinutes();
  }

  sendChatMessage() {
    const date = new Date();
    const ISODate = date.toISOString();
    const message = {
      'id': '',
      'username': this.loggedUser.username,
      'content': this.tmpMessageContent,
      'channel': this.selectedChatChannel.uniqueName,
      'date': ISODate
    };

    this.dataService.sendMessage(JSON.stringify(message));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
