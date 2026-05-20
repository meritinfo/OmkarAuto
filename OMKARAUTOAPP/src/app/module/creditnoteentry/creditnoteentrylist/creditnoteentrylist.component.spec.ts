import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditnoteentrylistComponent } from './creditnoteentrylist.component';

describe('CreditnoteentrylistComponent', () => {
  let component: CreditnoteentrylistComponent;
  let fixture: ComponentFixture<CreditnoteentrylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditnoteentrylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditnoteentrylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
