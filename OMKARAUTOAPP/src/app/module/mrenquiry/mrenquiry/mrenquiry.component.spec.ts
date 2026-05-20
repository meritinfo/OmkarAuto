import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrenquiryComponent } from './mrenquiry.component';

describe('MrenquiryComponent', () => {
  let component: MrenquiryComponent;
  let fixture: ComponentFixture<MrenquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrenquiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrenquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
