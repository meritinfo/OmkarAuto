import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillgstrptComponent } from './billgstrpt.component';

describe('BillgstrptComponent', () => {
  let component: BillgstrptComponent;
  let fixture: ComponentFixture<BillgstrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillgstrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillgstrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
