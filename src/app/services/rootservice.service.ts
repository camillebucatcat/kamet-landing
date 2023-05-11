import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertComponent } from '../component/modal/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class RootService {
  private _loaderenabled: BehaviorSubject<any> = new BehaviorSubject(false);
  private _checkloader: BehaviorSubject<any> = new BehaviorSubject(false);
  public readonly loaderenabled: Observable<any> = this._loaderenabled.asObservable();
  public readonly checkloader: Observable<any> = this._checkloader.asObservable();
  constructor(
    private alertCntrl:AlertController,
    private modalCntrl: ModalController,
    private router: Router,
    private toastCntrl: ToastController
    ) { }
  loading(isloading: any): void {
    return this._loaderenabled.next(isloading);
  }
  checkLoading(): void{
   this._checkloader.next(true);
   setTimeout(()=>{
      this.loading(false);
      this._checkloader.next(false);
   },1500);
  }
  IsJsonString(str: string) {
    if(str==null) return str;
    else return /^[\],:{}\s]*$/.test(str.replace(/\\["\\\/bfnrtu]/g, '@').
      replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
      replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
  }


  async alert(type: string, messages: any, buttons: any, dismissedonly?: any, submessage?: any) {
    const alertbox = await this.modalCntrl.create({
      component:AlertComponent,
      componentProps:{
        message:messages?messages.join("<br>"):'',
        submessage:submessage||'',
        type: type,
        buttons: buttons
      //   ||[{
      //    code:'ok',
      //    text: "Ok",
      //    color:'primary',
      //    handle:()=>{
      //      //
      //    }
      //  }]
      },
      cssClass:'dialog-modal',
      backdropDismiss:false
    });
    alertbox.onDidDismiss().then(async (details: any) => {
      if (buttons) {
        if (details.data){
          const bf = buttons.filter((a:any) => {
            return a.code == details.data.job;
          })[0];
          if (bf.handle) await bf.handle();
        }
      }else if(dismissedonly){
         await dismissedonly();
      }
    });
    return await alertbox.present();
  }

}
