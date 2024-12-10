import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastagdslrechargeentrylistComponent } from './fastagdslrechargeentrylist.component';

describe('FastagdslrechargeentrylistComponent', () => {
  let component: FastagdslrechargeentrylistComponent;
  let fixture: ComponentFixture<FastagdslrechargeentrylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastagdslrechargeentrylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FastagdslrechargeentrylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
