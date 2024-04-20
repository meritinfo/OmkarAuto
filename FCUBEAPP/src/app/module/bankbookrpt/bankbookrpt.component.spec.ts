import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankbookrptComponent } from './bankbookrpt.component';

describe('BankbookrptComponent', () => {
  let component: BankbookrptComponent;
  let fixture: ComponentFixture<BankbookrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankbookrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankbookrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
