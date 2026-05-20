import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpsalcalculationlistComponent } from './empsalcalculationlist.component';

describe('EmpsalcalculationlistComponent', () => {
  let component: EmpsalcalculationlistComponent;
  let fixture: ComponentFixture<EmpsalcalculationlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpsalcalculationlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpsalcalculationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
