import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditnoteentryaddComponent } from './creditnoteentryadd.component';

describe('CreditnoteentryaddComponent', () => {
  let component: CreditnoteentryaddComponent;
  let fixture: ComponentFixture<CreditnoteentryaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditnoteentryaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditnoteentryaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
