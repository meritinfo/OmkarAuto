import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcostrecorveryrptComponent } from './addcostrecorveryrpt.component';

describe('AddcostrecorveryrptComponent', () => {
  let component: AddcostrecorveryrptComponent;
  let fixture: ComponentFixture<AddcostrecorveryrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcostrecorveryrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcostrecorveryrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
