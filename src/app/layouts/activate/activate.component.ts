import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RESTAPI} from '../../shared/rest-api-calls';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {
  token: string;

  @ViewChild('modal') modal: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  activate() {
    const params = new HttpParams()
      .set('key', this.token);

    this.http.post(RESTAPI.getActivateAccountURL(), {}, {params: params}).subscribe(
      (response: any) => {
        this.modal.show('You have successfully activated your account!');
    },
      error => {
        this.modal.show(error);
      }
    );
  }

}
