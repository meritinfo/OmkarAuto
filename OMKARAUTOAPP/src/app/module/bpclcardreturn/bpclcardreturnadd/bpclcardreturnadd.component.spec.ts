import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpclcardreturnaddComponent } from './bpclcardreturnadd.component';

describe('BpclcardreturnaddComponent', () => {
  let component: BpclcardreturnaddComponent;
  let fixture: ComponentFixture<BpclcardreturnaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BpclcardreturnaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BpclcardreturnaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
