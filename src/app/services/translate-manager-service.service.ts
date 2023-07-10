import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateManagerServiceService {
  private _currentLang: BehaviorSubject<string> = new BehaviorSubject('es');
  public readonly currentLang: Observable<string> = this._currentLang.asObservable();

  constructor() { }
  setLang(lang: string) {
    this._currentLang.next(lang);
  }
}
