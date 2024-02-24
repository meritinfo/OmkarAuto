import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpsalarylistComponent } from './empsalarylist.component';

describe('EmpsalarylistComponent', () => {
  let component: EmpsalarylistComponent;
  let fixture: ComponentFixture<EmpsalarylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpsalarylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpsalarylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
