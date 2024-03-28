import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpsalcalculationaddComponent } from './empsalcalculationadd.component';

describe('EmpsalcalculationaddComponent', () => {
  let component: EmpsalcalculationaddComponent;
  let fixture: ComponentFixture<EmpsalcalculationaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpsalcalculationaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpsalcalculationaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
