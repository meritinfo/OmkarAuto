import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardnccComponent } from './dashboardncc.component';

describe('DashboardnccComponent', () => {
  let component: DashboardnccComponent;
  let fixture: ComponentFixture<DashboardnccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardnccComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardnccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
