import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditEventPage } from './event-edit.page';

describe('EventEditPage', () => {
  let component: EditEventPage;
  let fixture: ComponentFixture<EditEventPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
