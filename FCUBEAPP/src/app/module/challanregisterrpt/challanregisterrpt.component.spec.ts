import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanregisterrptComponent } from './challanregisterrpt.component';

describe('ChallanregisterrptComponent', () => {
  let component: ChallanregisterrptComponent;
  let fixture: ComponentFixture<ChallanregisterrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallanregisterrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallanregisterrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
