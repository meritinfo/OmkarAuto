import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionrptComponent } from './deductionrpt.component';

describe('DeductionrptComponent', () => {
  let component: DeductionrptComponent;
  let fixture: ComponentFixture<DeductionrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeductionrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeductionrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
