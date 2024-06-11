import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryackpodaddComponent } from './deliveryackpodadd.component';

describe('DeliveryackpodaddComponent', () => {
  let component: DeliveryackpodaddComponent;
  let fixture: ComponentFixture<DeliveryackpodaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryackpodaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryackpodaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
