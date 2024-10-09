import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsupplilistComponent } from './billsupplilist.component';

describe('BillsupplilistComponent', () => {
  let component: BillsupplilistComponent;
  let fixture: ComponentFixture<BillsupplilistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsupplilistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsupplilistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
