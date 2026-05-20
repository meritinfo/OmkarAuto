import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerledgerprtComponent } from './brokerledgerprt.component';

describe('BrokerledgerprtComponent', () => {
  let component: BrokerledgerprtComponent;
  let fixture: ComponentFixture<BrokerledgerprtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerledgerprtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrokerledgerprtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
