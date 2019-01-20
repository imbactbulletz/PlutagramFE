import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RESTAPI} from '../../shared/rest-api-calls';
import {RegisterDTO} from '../../shared/models/dto/register.dto';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private email;
  private username;
  private password;

  private modal: MDBModalRef;

  constructor(private http: HttpClient, private modalService: MDBModalService) {
  }

  ngOnInit() {
  }

  register() {
    const body = {
      'email': this.email,
      'username': this.username,
      'password': this.password
    };

    this.http.post(RESTAPI.getSignUpURL(), body).subscribe(
      (response: RegisterDTO) => {
        if (response != null) {
          this.openModal();
        }
      }
    );
  }

  openModal() {
    this.modal = this.modalService.show(ModalComponent);
  }
}
