import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
@Input() type: string = '';
@Input() message: string ='';
@Input() buttons: any;
@Input() submessage: string = '';
  constructor(public modalController: ModalController) { }

  ngOnInit() {}
  task(button: any){
    this.modalController.dismiss({
      job: button.code
    });
  }
  close(){
    this.modalController.dismiss({
      job: 'close'
    });
  }
}
