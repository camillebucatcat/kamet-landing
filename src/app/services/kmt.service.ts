import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpServicesService }  from 'src/app/services/http-services.service';


@Injectable({
  providedIn: 'root'
})
export class KmtService {


  constructor(private http: HttpServicesService, public router: Router) { }
  CreateInvitationCode(data:any){
    return new Promise((resolve,reject)=>{
      this.http.request({
        url: "GetReferralCode",
        data,
        method: "post",
        serial: 'json'
      }).subscribe((res) => {
        console.log(res)
        resolve(res)
      }, (error) => {
        console.log(error);
        let errorresult = this.http.processError(error);
        reject(errorresult);
      });
    });
  }
}
