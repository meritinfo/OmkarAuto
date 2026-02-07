import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpclcardrechargeappComponent } from './bpclcardrechargeapp.component';

describe('BpclcardrechargeappComponent', () => {
  let component: BpclcardrechargeappComponent;
  let fixture: ComponentFixture<BpclcardrechargeappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BpclcardrechargeappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BpclcardrechargeappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
