import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerreportComponent } from './ledgerreport.component';

describe('LedgerreportComponent', () => {
  let component: LedgerreportComponent;
  let fixture: ComponentFixture<LedgerreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LedgerreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LedgerreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
