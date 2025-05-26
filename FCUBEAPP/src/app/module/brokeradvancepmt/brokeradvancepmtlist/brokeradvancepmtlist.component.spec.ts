import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokeradvancepmtlistComponent } from './brokeradvancepmtlist.component';

describe('BrokeradvancepmtlistComponent', () => {
  let component: BrokeradvancepmtlistComponent;
  let fixture: ComponentFixture<BrokeradvancepmtlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokeradvancepmtlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrokeradvancepmtlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
