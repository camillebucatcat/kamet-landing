import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class EnvSwapService {
  private _uri: BehaviorSubject<any> = new BehaviorSubject('test');
  public readonly uri: Observable<any> = this._uri.asObservable();
  constructor() { }
  set(env: string): void {
    Storage.set({key:'env',value:env});
    // sessionStorage.setItem("uri",env);
    return this._uri.next(env);
  }
}
