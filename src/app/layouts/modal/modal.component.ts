import { Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  content: string;

  properties = {
    backdrop: true,
    ignoreBackdropClick: false};

  @ViewChild('modal') modal: any;

  constructor() { }

  ngOnInit() {
  }

  show(content: string) {
    this.content = content;
    this.modal.show();
  }

  setProperties(backdrop = true, ignoreBackdropClick = false){
    this.properties = {
      'backdrop': backdrop,
      'ignoreBackdropClick': ignoreBackdropClick
    };
  }
}
