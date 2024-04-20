import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmppaygenerationaddComponent } from './emppaygenerationadd.component';

describe('EmppaygenerationaddComponent', () => {
  let component: EmppaygenerationaddComponent;
  let fixture: ComponentFixture<EmppaygenerationaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmppaygenerationaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmppaygenerationaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
