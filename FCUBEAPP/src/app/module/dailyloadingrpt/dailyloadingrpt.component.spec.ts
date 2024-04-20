import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyloadingrptComponent } from './dailyloadingrpt.component';

describe('DailyloadingrptComponent', () => {
  let component: DailyloadingrptComponent;
  let fixture: ComponentFixture<DailyloadingrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyloadingrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyloadingrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
