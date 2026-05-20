import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DprdashboardComponent } from './dprdashboard.component';

describe('DprdashboardComponent', () => {
  let component: DprdashboardComponent;
  let fixture: ComponentFixture<DprdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DprdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DprdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
