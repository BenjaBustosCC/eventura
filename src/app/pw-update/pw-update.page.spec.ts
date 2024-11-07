import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PwUpdatePage } from './pw-update.page';

describe('PwUpdatePage', () => {
  let component: PwUpdatePage;
  let fixture: ComponentFixture<PwUpdatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PwUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
