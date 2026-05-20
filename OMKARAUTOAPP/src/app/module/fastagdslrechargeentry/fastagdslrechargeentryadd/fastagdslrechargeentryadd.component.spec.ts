import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastagdslrechargeentryaddComponent } from './fastagdslrechargeentryadd.component';

describe('FastagdslrechargeentryaddComponent', () => {
  let component: FastagdslrechargeentryaddComponent;
  let fixture: ComponentFixture<FastagdslrechargeentryaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastagdslrechargeentryaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FastagdslrechargeentryaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
