import { Injectable } from '@angular/core';
// import { NavController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { from, Observable } from 'rxjs';
import { ISendRequest } from 'src/app/interfaces/isend-request';
import { env } from 'src/app/services/var';
import { EnvSwapService } from 'src/app/services/env-swap.service';
import { Storage } from '@capacitor/storage';
import { CryptoServiceService } from './crypto.service.service';

@Injectable({
  providedIn: 'root'
})
export class HttpServicesService {
  public pentestenabled: boolean = true;
  private envtype: any = "prod";
  constructor( public router: Router, private http: HttpClient, private nhttp: HTTP,private envswap: EnvSwapService, private crypto: CryptoServiceService) {
    this.envswap.uri.subscribe((env: string) => {
      Storage.get({key:'env'}).then((data:any)=>{
        let ent = env || data.value; // ((this.platform.is("hybrid")) ? (sessionStorage.getItem("uri") || env) : "default");
        // this.pentestenabled = ent=='prodpen' || ent=='devpen';
        this.envtype = (ent=='prodpen' ? 'prod' : (ent=='devpen' ? 'test' : ent));
      });
    });
  }
  request(k: ISendRequest): Observable<any>  {
    if(!this.pentestenabled) return this.defaultrequest(k);
    else return from(this.pentesthttp(k)); 
  }
  defaultrequest(k: ISendRequest): Observable<any>  {
    let headers : any = {
      ...k.headers
    };
    
    headers["DeviceId"] = localStorage.getItem("device.uuid")?localStorage.getItem("device.uuid"):'';
    headers["Type"] = localStorage.getItem("device.type")?localStorage.getItem("device.type"):'';
    headers["Timezone"] = localStorage.getItem("device.timezone")?localStorage.getItem("device.timezone"):'';
    headers["Version"] = localStorage.getItem("device.version")?localStorage.getItem("device.version"):'';
    headers["Manufacturer"] = localStorage.getItem("device.manufacturer")? localStorage.getItem("device.manufacturer"):'';
    headers["Model"] = localStorage.getItem("device.model")?localStorage.getItem("device.model"):'';
    headers["Platform"] = localStorage.getItem("device.type")?localStorage.getItem("device.type"):'';

    headers["ApiKey"] = env[this.envtype].ApiKey;
    headers["ProgramKey"] = env[this.envtype].ProgramKey;
    if(sessionStorage.getItem("SessionId")) headers["Authorization"] = "Bearer " + sessionStorage.getItem("SessionId");
    let finurl = `${env[this.envtype][k.base_url?k.base_url:"base_url"]}/${k.url}`;
    const options : any = {
      method: k.method.toUpperCase(),
      headers: headers
    }
    if(k.data){
      options['body'] = JSON.stringify(k.data);
    }
    let finparams: any = {};
    if(k.params){
      Object.keys(k.params).map((data)=>{ 
        if(k.params[data] && k.params[data]!==null) finparams[data] = k.params[data];
      });
    }
    // if (this.platform.is("hybrid") && k.serial!='multipart') {
    if(false){
      return new Observable<any>((obj) => {
        this.nhttp.setDataSerializer(k.serial || 'json');
        console.log(finparams);
        console.log(k.data);
        this.nhttp.sendRequest(finurl, {
          params: finparams,
          data: k.data,
          headers: headers,
          method: k.method,
          responseType: k.responseType,
          timeout: k.timeout || 0,
          filePath: k.filePath || '',
          name: k.name || ''
        }).then((response) => {     
          console.log("success: " + response);
          let fresponse = response.data;
          try {
            fresponse = JSON.parse(fresponse);
          } catch (err) {

          }
          obj.next(fresponse);
        }).catch((response) => {
          console.log("error: " + response);
          console.log(response);
          try {
            response.error = JSON.parse(response.error).error || JSON.parse(response.error);
          } catch (error) {
            response.error = response.error || 'Unexpected error'
          }

          let finalerror = {
            error: response.error
          }

          if (typeof finalerror.error != "object") {
            if (finalerror.error.includes("request timed out")) {
              obj.error({
                error: {
                  'The request timed out': 'The request timed out'
                }
              });
            } else if (finalerror.error.includes("Host could not be resolved") || finalerror.error.includes("appears to be offline")) {
              obj.error({
                error: {
                  'No Internet connection. Make sure that Wi-Fi or mobile data is turned on, then try again.': 'No Internet connection. Make sure that Wi-Fi or mobile data is turned on, then try again.'
                }
              });
              sessionStorage.clear();
            }
          } else {
            obj.error(finalerror);
          }
        });
      });
    } else {
      let h : any = {
        headers: new HttpHeaders(headers),
        params: k.params
      }
      if (k.responseType) h['responseType'] = k.responseType;
      switch (k.method) {
        default:
        case 'get':
          return this.http.get(finurl, h);
          /* return from(fetch(finurl, {
            method: 'GET',
            headers: {
              ...headers,
              params: k.params
            }
          })
          .then((response) => response.json())); */
        case 'post':
          return this.http.post(finurl, k.data, h);
          /* return from(fetch(finurl, {
            method: 'POST',
            headers: {
              headers: headers
            },
            body: JSON.stringify(k.data)
          })
          .then((response) => response.json())); */
        case 'put':
          return this.http.put(finurl, k.data, h);
        case 'patch':
          return this.http.patch(finurl, k.data, h);
        case 'head':
          return this.http.head(finurl, k.params);
        case 'delete':
          return this.http.delete(finurl, k.params);
        case 'options':
          return this.http.options(finurl, k.params);
      }
    }
  }
  processError(error: any){
    if (!this.isjson(error)) {
      return "Unable to process request";
    }else if(error.status == 401){
      sessionStorage.clear();
      // this.navigate.navigateRoot(['landing']);
    }else{
      let fin_error;
      try{
        fin_error = error.error;
      }catch(e){
        fin_error = error;
      }
      return fin_error;
    }
  }
  isjson(str: string) {
    let ret = false;
    if (ret) ret = /^[\],:{}\s]*$/.test(str.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
    return str;
  }
  getIV(){
    return new Promise((resolve,reject)=>{
      this.defaultrequest({
        base_url: "pentest_url",
        url:"Authentication/IV",
        headers: {
          client_id: env[this.envtype].client_id,
          client_secret: env[this.envtype].client_secret,
          grant_type: env[this.envtype].grant_type
        },
        method: "get",
        serial: 'json'
      }).subscribe((res) => {
        resolve(res.data[0].iv)
      }, (error) => {
        let errorresult = this.processError(error);
        reject(errorresult);
      });
    });
  }
  encrpytData(iv: any,service: string,method: any,data: any){
    return new Promise((resolve,reject)=>{
      let temp_data = {
        Service: service,
        Method: method,
        ...data
      }
      let encrypted_data = this.crypto.encryptJson(temp_data, env[this.envtype].ApiKey, iv);
      resolve(encrypted_data);
      // this.defaultrequest({
      //   base_url: "pentest_url",
      //   url:"TraxEncrypt",
      //   headers: {
      //     iv: iv
      //   },
      //   data:{
      //     Service: service,
      //     Method: method,
      //     ...data
      //   },
      //   method: "post",
      //   serial: 'json'
      // }).subscribe((res) => {
      //   resolve(res.message)
      // }, (error) => {
      //   console.log(error);
      //   let errorresult = this.processError(error);
      //   reject(errorresult);
      // });
    });
  }
  pentesthttp(k: ISendRequest){
    let finparams: any = {};
    if(k.params){
      Object.keys(k.params).map((data)=>{ 
        if(k.params[data] && k.params[data]!==null) finparams[data] = k.params[data];
        // finparams.push(data+"="+k.params[data]);
      });
      //console.log(finparams)
      //finurl += "?" + finparams.join("&");
    }else{
      finparams = k.data;
    }
    return new Promise((resolve,reject)=>{
      let debug: any = { request: null, response: null };
      (<any>window).__encryption__ = debug;
      return this.getIV().then((ivtoken)=>{
        return this.encrpytData(ivtoken,'ash',k.url,{
          ...finparams
        }).then((encdata)=>{
          debug.request = {
            url: k.url,
            data: {
              ...finparams
            }
          };
          this.defaultrequest({
            base_url: k.base_url?k.base_url:"pentest_url",
            url:  k.requestype == 'v2' ? "Service/RequestV2" : k.requestype == 'v3' ?"Service/UploadProfile" : "Service/Request",
            headers: {
              iv: ivtoken,
              value: encdata
            },
            data: k.requestype == 'v2' ? k.v2data : k.requestype == 'v3'? k.v3data : k.data,
            method: k.requestype == 'v2' || k.requestype == 'v3' ? "post" : 'get',
            serial: k.requestype == 'v2' || k.requestype == 'v3'?'json': k.serial,
            responseType: 'text'
          }).subscribe((res1) => {
            let data = this.crypto.decryptJson(res1, env[this.envtype].ApiKey, ivtoken);
            debug.response = {
              original: data,
              encrypted: res1
            }
            // console.log("api response" ,debug);
            if(debug.response.original.isSuccess===true) resolve(debug.response.original)
            else reject({
             error: debug.response.original
            });
          }, (error1) => {
            // console.log(error1);
            let errorresult = this.processError(error1);
            reject(errorresult);
          });
        }).catch((error2)=>{
          // console.log(error2);
          let errorresult = this.processError(error2);
            reject(errorresult);
        });
      }).catch((error)=>{
        // console.log(error);
        let errorresult = this.processError(error);
            reject(errorresult);
      });
      
    });
  }
}
