import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RESTAPI} from '../../shared/rest-api-calls';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit, AfterViewInit {
  token: string;

  @ViewChild('modal') modal: any;
  @ViewChild('tokenInput') tokenInput: ElementRef;

  constructor(private http: HttpClient, private activeRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activeRoute.queryParams.subscribe( queryParams => {
        const token = queryParams['key'];
        if (token) {
          this.token = token;
        }
      });
  }

  ngAfterViewInit() {
    this.tokenInput.nativeElement.disabled = true;
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
