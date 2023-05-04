import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticeOfPrivacyPage } from './notice-of-privacy.page';

describe('NoticeOfPrivacyPage', () => {
  let component: NoticeOfPrivacyPage;
  let fixture: ComponentFixture<NoticeOfPrivacyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NoticeOfPrivacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
