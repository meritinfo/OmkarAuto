import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanenquiryComponent } from './challanenquiry.component';

describe('ChallanenquiryComponent', () => {
  let component: ChallanenquiryComponent;
  let fixture: ComponentFixture<ChallanenquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallanenquiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallanenquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
