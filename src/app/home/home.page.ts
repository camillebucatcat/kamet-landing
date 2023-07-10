import { Component, Input } from '@angular/core';
import { KmtService } from '../services/kmt.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RootService } from '../services/rootservice.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateManagerService } from '../services/translate-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public selectedcountry: any = {
    "country_id":"138",
    "code":"MX",
    "code2":"MEX",
    "currency_code":"MXN",
    "name":"Mexico",
    "mobile_prefix":"52",
    "id":"138",
    "icon":"https://restcountries.eu/data/mex.svg",
    "description":"Mexico",
    "loaded":true
  };

  public loaded : boolean = false
  referrer: string = '';
  getInfo : number = 1
  sendcode : boolean =false
  isModalOpen = false;

  profileForm = new FormGroup({
    Nombre: new FormControl(''),
    Apellido: new FormControl(''),
    Correo: new FormControl(''),
    Numero: new FormControl(''),
  });
  countries: any;
  flagimage: string = '';
  

  constructor(private trans: TranslateManagerService,private translate : TranslateService,private rootService : RootService,private kmtService:KmtService, private route : ActivatedRoute) {

    this.route.queryParams.subscribe((data:any)=>{
      this.referrer = data.ReferrerEmail
    })
  }

  ionViewWillEnter(){
    this.getInfo = 1
    this.dosearch("");
    this.flagimage = `assets/country-flags/${this.selectedcountry.code.toLowerCase()}.png`
  }


  dosearch(searchkey:string){
    // console.log(searchkey)
    if(searchkey){
      const searched = this.kmtService.countries.filter((a: any)=>{
        return a.name.toLowerCase().indexOf(searchkey.toLowerCase()) >-1;
      });
      this.countries = searched;
    }else this.countries = this.kmtService.countries;
    console.log(this.countries)
  }

  searchbar(event: any){
    this.dosearch(event.target.value)
  }


  selectcountry(selected:any){
    this.selectedcountry = selected
    this.flagimage = `assets/country-flags/${this.selectedcountry.code.toLowerCase()}.png`
    this.setOpen(false)
    console.log(this.selectedcountry)
  }
  geticon(data: any) {
    return `assets/country-flags/${data.code.toLowerCase()}.png`;
  }


  confirm(){
    this.loaded = true
    var fname = this.profileForm.controls.Nombre.value
    var lname = this.profileForm.controls.Apellido.value
    var email = this.profileForm.controls.Correo.value
    var number ='+'+ this.selectedcountry.mobile_prefix + this.profileForm.controls.Numero.value
    this.kmtService.CreateInvitationCode({
      FirstName: fname,
        LastName : lname,
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


  setOpen(isOpen: boolean) {
    if(isOpen == true)this.dosearch("");
    this.isModalOpen = isOpen;

  }
}
