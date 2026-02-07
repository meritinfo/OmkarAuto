import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpclcardrechargereqlistComponent } from './bpclcardrechargereqlist.component';

describe('BpclcardrechargereqlistComponent', () => {
  let component: BpclcardrechargereqlistComponent;
  let fixture: ComponentFixture<BpclcardrechargereqlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BpclcardrechargereqlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BpclcardrechargereqlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
