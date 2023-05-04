import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticeOfPrivacyPage } from './notice-of-privacy.page';

const routes: Routes = [
  {
    path: '',
    component: NoticeOfPrivacyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticeOfPrivacyPageRoutingModule {}
