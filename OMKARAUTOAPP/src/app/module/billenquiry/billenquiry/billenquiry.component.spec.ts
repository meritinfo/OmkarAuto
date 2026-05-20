import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillenquiryComponent } from './billenquiry.component';

describe('BillenquiryComponent', () => {
  let component: BillenquiryComponent;
  let fixture: ComponentFixture<BillenquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillenquiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillenquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
