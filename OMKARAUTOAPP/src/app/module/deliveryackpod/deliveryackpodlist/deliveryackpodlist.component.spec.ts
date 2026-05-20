import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryackpodlistComponent } from './deliveryackpodlist.component';

describe('DeliveryackpodlistComponent', () => {
  let component: DeliveryackpodlistComponent;
  let fixture: ComponentFixture<DeliveryackpodlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryackpodlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryackpodlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
