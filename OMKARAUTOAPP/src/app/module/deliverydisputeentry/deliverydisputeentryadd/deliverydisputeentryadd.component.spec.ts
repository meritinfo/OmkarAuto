import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverydisputeentryaddComponent } from './deliverydisputeentryadd.component';

describe('DeliverydisputeentryaddComponent', () => {
  let component: DeliverydisputeentryaddComponent;
  let fixture: ComponentFixture<DeliverydisputeentryaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverydisputeentryaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliverydisputeentryaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
