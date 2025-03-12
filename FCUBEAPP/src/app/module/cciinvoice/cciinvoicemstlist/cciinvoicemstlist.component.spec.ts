import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CciinvoicemstlistComponent } from './cciinvoicemstlist.component';

describe('CciinvoicemstlistComponent', () => {
  let component: CciinvoicemstlistComponent;
  let fixture: ComponentFixture<CciinvoicemstlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CciinvoicemstlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CciinvoicemstlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
