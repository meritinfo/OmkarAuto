import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardcustComponent } from './dashboardcust.component';

describe('DashboardcustComponent', () => {
  let component: DashboardcustComponent;
  let fixture: ComponentFixture<DashboardcustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardcustComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardcustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
