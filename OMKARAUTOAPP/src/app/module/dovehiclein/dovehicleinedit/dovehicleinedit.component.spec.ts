import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DovehicleineditComponent } from './dovehicleinedit.component';

describe('DovehicleineditComponent', () => {
  let component: DovehicleineditComponent;
  let fixture: ComponentFixture<DovehicleineditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DovehicleineditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DovehicleineditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
