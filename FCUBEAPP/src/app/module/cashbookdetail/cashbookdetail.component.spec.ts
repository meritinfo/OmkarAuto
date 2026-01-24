import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashbookdetailComponent } from './cashbookdetail.component';

describe('CashbookdetailComponent', () => {
  let component: CashbookdetailComponent;
  let fixture: ComponentFixture<CashbookdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashbookdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashbookdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
