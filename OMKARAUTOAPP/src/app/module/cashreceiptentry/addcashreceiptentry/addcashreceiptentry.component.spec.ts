import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcashreceiptentryComponent } from './addcashreceiptentry.component';

describe('AddcashreceiptentryComponent', () => {
  let component: AddcashreceiptentryComponent;
  let fixture: ComponentFixture<AddcashreceiptentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcashreceiptentryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcashreceiptentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
