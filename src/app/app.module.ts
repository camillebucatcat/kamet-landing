import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { SharedModule } from './share.module';
import { TranslateService } from '@ngx-translate/core';

@NgModule({
  declarations: [AppComponent],
  imports: [SharedModule,HttpClientModule,ReactiveFormsModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [HTTP, HttpClient,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(public translate: TranslateService){
    const deflang = 'es';
    this.translate.addLangs(['en','es']);
    this.translate.setDefaultLang(deflang)
  }
}
