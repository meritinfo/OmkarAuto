import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashreceiptentrylistComponent } from './cashreceiptentrylist.component';

describe('CashreceiptentrylistComponent', () => {
  let component: CashreceiptentrylistComponent;
  let fixture: ComponentFixture<CashreceiptentrylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashreceiptentrylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashreceiptentrylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
