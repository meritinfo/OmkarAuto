import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyperformancerptComponent } from './monthlyperformancerpt.component';

describe('MonthlyperformancerptComponent', () => {
  let component: MonthlyperformancerptComponent;
  let fixture: ComponentFixture<MonthlyperformancerptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyperformancerptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyperformancerptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
