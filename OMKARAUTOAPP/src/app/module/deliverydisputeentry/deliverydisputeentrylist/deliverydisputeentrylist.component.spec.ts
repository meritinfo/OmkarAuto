import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverydisputeentrylistComponent } from './deliverydisputeentrylist.component';

describe('DeliverydisputeentrylistComponent', () => {
  let component: DeliverydisputeentrylistComponent;
  let fixture: ComponentFixture<DeliverydisputeentrylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverydisputeentrylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliverydisputeentrylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
