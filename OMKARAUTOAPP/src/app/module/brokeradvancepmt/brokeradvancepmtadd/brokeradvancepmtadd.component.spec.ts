import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokeradvancepmtaddComponent } from './brokeradvancepmtadd.component';

describe('BrokeradvancepmtaddComponent', () => {
  let component: BrokeradvancepmtaddComponent;
  let fixture: ComponentFixture<BrokeradvancepmtaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokeradvancepmtaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrokeradvancepmtaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
