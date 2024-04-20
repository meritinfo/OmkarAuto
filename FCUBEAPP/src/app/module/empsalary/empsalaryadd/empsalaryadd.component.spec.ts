import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpsalaryaddComponent } from './empsalaryadd.component';

describe('EmpsalaryaddComponent', () => {
  let component: EmpsalaryaddComponent;
  let fixture: ComponentFixture<EmpsalaryaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpsalaryaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpsalaryaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
