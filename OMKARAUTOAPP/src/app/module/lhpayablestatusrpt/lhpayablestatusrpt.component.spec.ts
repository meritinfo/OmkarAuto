import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhpayablestatusrptComponent } from './lhpayablestatusrpt.component';

describe('LhpayablestatusrptComponent', () => {
  let component: LhpayablestatusrptComponent;
  let fixture: ComponentFixture<LhpayablestatusrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhpayablestatusrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LhpayablestatusrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
