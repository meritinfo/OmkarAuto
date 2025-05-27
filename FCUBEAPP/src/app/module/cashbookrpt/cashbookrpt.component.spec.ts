import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashbookrptComponent } from './cashbookrpt.component';

describe('CashbookrptComponent', () => {
  let component: CashbookrptComponent;
  let fixture: ComponentFixture<CashbookrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashbookrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashbookrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
