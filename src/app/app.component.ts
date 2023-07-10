import { Component } from '@angular/core';
import { TranslateManagerService } from './services/translate-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public trans : TranslateManagerService) {

    this.trans.setLang('es');
  }
}
