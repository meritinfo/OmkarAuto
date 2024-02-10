import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverlicrptComponent } from './driverlicrpt.component';

describe('DriverlicrptComponent', () => {
  let component: DriverlicrptComponent;
  let fixture: ComponentFixture<DriverlicrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverlicrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverlicrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
