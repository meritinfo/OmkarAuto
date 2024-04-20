import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripstatusrptComponent } from './tripstatusrpt.component';

describe('TripstatusrptComponent', () => {
  let component: TripstatusrptComponent;
  let fixture: ComponentFixture<TripstatusrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripstatusrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripstatusrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
