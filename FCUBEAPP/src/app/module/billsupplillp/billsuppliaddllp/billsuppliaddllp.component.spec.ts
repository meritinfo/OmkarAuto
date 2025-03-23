import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsuppliaddllpComponent } from './billsuppliaddllp.component';

describe('BillsuppliaddllpComponent', () => {
  let component: BillsuppliaddllpComponent;
  let fixture: ComponentFixture<BillsuppliaddllpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsuppliaddllpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsuppliaddllpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
