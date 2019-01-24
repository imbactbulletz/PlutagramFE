import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../shared/services/data.service';
import {Subscription} from 'rxjs';
import {User} from '../../shared/models/dto/user.model';
import {HttpClient} from '@angular/common/http';
import {RESTAPI} from '../../shared/rest-api-calls';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  defaultProfileImageUrl = 'https://scontent.fbeg1-1.fna.fbcdn.net/v/t1.0-9/10157211_10202990567340511_2368130898099636845_n.jpg?_nc_cat=106&_nc_ht=scontent.fbeg1-1.fna&oh=9313a64c8c3592781ce4608582a1f6ef&oe=5CC6D28E';
  user: User;
  imageFile;
  imageSrc;

  private userSubscription: Subscription;

  constructor(private http: HttpClient, private dataService: DataService) {
  }

  ngOnInit() {
    this.userSubscription = this.dataService.user.subscribe( user => {
      this.user = user;
    });
  }

  onFileChanged(event) {
    this.imageFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.imageFile);
  }


  applySettings() {
    const body = this.user;

    if (this.imageSrc) {
      body['imageAsBase64String'] = this.imageSrc.slice('data:image/png;base64,'.length, this.imageSrc.length);
    }

    this.http.put(RESTAPI.changeSettingsURL(), body).subscribe( (response: User) => {
      console.log(body);
      this.dataService.changeUser(response);
    });
  }

  displayPicture() {
    if (this.imageSrc) {
      return this.imageSrc;
    }

    if (this.user.profileImageUrl) {
      return RESTAPI.photoServerUrl + this.user.profileImageUrl;
    } else {
      return this.defaultProfileImageUrl;
    }
  }
}
