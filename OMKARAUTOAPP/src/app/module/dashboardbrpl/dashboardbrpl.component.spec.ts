import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardbrplComponent } from './dashboardbrpl.component';

describe('DashboardbrplComponent', () => {
  let component: DashboardbrplComponent;
  let fixture: ComponentFixture<DashboardbrplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardbrplComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardbrplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
