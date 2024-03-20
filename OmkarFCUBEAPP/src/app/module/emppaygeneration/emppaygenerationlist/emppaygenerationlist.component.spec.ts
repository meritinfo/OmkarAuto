import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmppaygenerationlistComponent } from './emppaygenerationlist.component';

describe('EmppaygenerationlistComponent', () => {
  let component: EmppaygenerationlistComponent;
  let fixture: ComponentFixture<EmppaygenerationlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmppaygenerationlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmppaygenerationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
