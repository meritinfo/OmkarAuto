import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsuppliaddComponent } from './billsuppliadd.component';

describe('BillsuppliaddComponent', () => {
  let component: BillsuppliaddComponent;
  let fixture: ComponentFixture<BillsuppliaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsuppliaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsuppliaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
