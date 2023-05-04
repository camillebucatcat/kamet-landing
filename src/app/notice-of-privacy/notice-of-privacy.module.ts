import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticeOfPrivacyPageRoutingModule } from './notice-of-privacy-routing.module';

import { NoticeOfPrivacyPage } from './notice-of-privacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoticeOfPrivacyPageRoutingModule
  ],
  declarations: [NoticeOfPrivacyPage]
})
export class NoticeOfPrivacyPageModule {}
