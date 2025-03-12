import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CciinvoicemstaddComponent } from './cciinvoicemstadd.component';

describe('CciinvoicemstaddComponent', () => {
  let component: CciinvoicemstaddComponent;
  let fixture: ComponentFixture<CciinvoicemstaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CciinvoicemstaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CciinvoicemstaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
