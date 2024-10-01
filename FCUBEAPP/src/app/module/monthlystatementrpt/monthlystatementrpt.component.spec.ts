import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlystatementrptComponent } from './monthlystatementrpt.component';

describe('MonthlystatementrptComponent', () => {
  let component: MonthlystatementrptComponent;
  let fixture: ComponentFixture<MonthlystatementrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlystatementrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlystatementrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
