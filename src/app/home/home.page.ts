import { Component } from '@angular/core';
import { KmtService } from '../services/kmt.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  

  constructor(private kmtService:KmtService, private route : ActivatedRoute) {

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
      ReferrerEmail: this.referrer?this.referrer:""
    }).then((data:any)=>{
      this.loaded = false
      console.log(data)
      this.getInfo = 2
    }).catch((error:any)=>{
      this.loaded = false
      if(error.Message == "This email has received more than 3 referral code request."){
        this.getInfo=4
      }
      
    })
  }

  resend(){
    this.loaded = true
    var name = this.profileForm.controls.Nombre.value
    var email = this.profileForm.controls.Correo.value
    var number = this.profileForm.controls.Numero.value
    this.kmtService.CreateInvitationCode({
      FullName : name,
      Email : email,
      MobileNumber : number,
      ReferrerEmail: this.referrer?this.referrer:""
    }).then((data:any)=>{
      this.loaded = false
      console.log(data)
      this.getInfo = 3

    }).catch(()=>{
      this.loaded = false
      this.getInfo=4
    })
  }

}
