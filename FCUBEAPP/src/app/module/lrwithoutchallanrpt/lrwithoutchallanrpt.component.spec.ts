import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LrwithoutchallanrptComponent } from './lrwithoutchallanrpt.component';

describe('LrwithoutchallanrptComponent', () => {
  let component: LrwithoutchallanrptComponent;
  let fixture: ComponentFixture<LrwithoutchallanrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LrwithoutchallanrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LrwithoutchallanrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
