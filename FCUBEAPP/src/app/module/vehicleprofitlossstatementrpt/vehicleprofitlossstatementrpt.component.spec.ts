import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleprofitlossstatementrptComponent } from './vehicleprofitlossstatementrpt.component';

describe('VehicleprofitlossstatementrptComponent', () => {
  let component: VehicleprofitlossstatementrptComponent;
  let fixture: ComponentFixture<VehicleprofitlossstatementrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleprofitlossstatementrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleprofitlossstatementrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
