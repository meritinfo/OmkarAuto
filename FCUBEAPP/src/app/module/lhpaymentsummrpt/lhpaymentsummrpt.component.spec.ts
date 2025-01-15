import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhpaymentsummrptComponent } from './lhpaymentsummrpt.component';

describe('LhpaymentsummrptComponent', () => {
  let component: LhpaymentsummrptComponent;
  let fixture: ComponentFixture<LhpaymentsummrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhpaymentsummrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LhpaymentsummrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
