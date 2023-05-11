import { Component } from '@angular/core';
import { KmtService } from '../services/kmt.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RootService } from '../services/rootservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public loaded : boolean = false
  referrer: string = '';
  getInfo : number = 1
  sendcode : boolean =false

  profileForm = new FormGroup({
    Nombre: new FormControl(''),
    Correo: new FormControl(''),
    Numero: new FormControl(''),
  });
  

  constructor(private rootService : RootService,private kmtService:KmtService, private route : ActivatedRoute) {

    this.route.queryParams.subscribe((data:any)=>{
      this.referrer = data.ReferrerEmail
    })
  }

  ionViewWillEnter(){
    this.getInfo = 1
  }

  confirm(){
    this.loaded = true
    var name = this.profileForm.controls.Nombre.value
    var email = this.profileForm.controls.Correo.value
    var number = this.profileForm.controls.Numero.value
    this.kmtService.CreateInvitationCode({
        FullName : name,
        Email : email,
        MobileNumber : number,
    }).then((data:any)=>{
      console.log(data)
      this.loaded = false
      if(data.Data.ResponseCode == "REFERRAL_1x")this.getInfo = 2 
      if(data.Data.ResponseCode == "REFERRAL_2x")this.getInfo = 3
    }).catch((error:any)=>{
      this.loaded = false
      
      if(error.Data.ResponseCode == "REFERRAL_3x"){
        this.getInfo=4
      }
      else{
        this.rootService.alert('error',[error.Data.Message],null);
      }
      
    })
  }

}
