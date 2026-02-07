import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpclcardrechargereqaddComponent } from './bpclcardrechargereqadd.component';

describe('BpclcardrechargereqaddComponent', () => {
  let component: BpclcardrechargereqaddComponent;
  let fixture: ComponentFixture<BpclcardrechargereqaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BpclcardrechargereqaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BpclcardrechargereqaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
