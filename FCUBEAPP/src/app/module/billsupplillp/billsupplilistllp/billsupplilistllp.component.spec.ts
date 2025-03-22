import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsupplilistllpComponent } from './billsupplilistllp.component';

describe('BillsupplilistllpComponent', () => {
  let component: BillsupplilistllpComponent;
  let fixture: ComponentFixture<BillsupplilistllpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsupplilistllpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsupplilistllpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
