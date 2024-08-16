import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnenquiryComponent } from './cnenquiry.component';

describe('CnenquiryComponent', () => {
  let component: CnenquiryComponent;
  let fixture: ComponentFixture<CnenquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnenquiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CnenquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
