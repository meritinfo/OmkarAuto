import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillregisterrptComponent } from './billregisterrpt.component';

describe('BillregisterrptComponent', () => {
  let component: BillregisterrptComponent;
  let fixture: ComponentFixture<BillregisterrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillregisterrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillregisterrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
