import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankbookdetailComponent } from './bankbookdetail.component';

describe('BankbookdetailComponent', () => {
  let component: BankbookdetailComponent;
  let fixture: ComponentFixture<BankbookdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankbookdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankbookdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
