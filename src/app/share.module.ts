import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';


import { AlertComponent } from './component/modal/alert/alert.component';

@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
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
  ]
})
export class SharedModule {
  constructor(){
  }
}
