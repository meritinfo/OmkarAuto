import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpclcardreturnlistComponent } from './bpclcardreturnlist.component';

describe('BpclcardreturnlistComponent', () => {
  let component: BpclcardreturnlistComponent;
  let fixture: ComponentFixture<BpclcardreturnlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BpclcardreturnlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BpclcardreturnlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
