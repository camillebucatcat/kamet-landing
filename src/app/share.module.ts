import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';


import { AlertComponent } from './component/modal/alert/alert.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateManagerService } from './services/translate-manager.service';

@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    CurrencyPipe
  ],
  exports: [
    AlertComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    IonicModule,
    TranslateModule,
  ]

})
export class SharedModule {
  constructor(public translateService:TranslateService, public translateManager: TranslateManagerService){
    this.translateManager.currentLang.subscribe((lang)=>{
      this.translateService.use(lang);  
    });
  }
}
