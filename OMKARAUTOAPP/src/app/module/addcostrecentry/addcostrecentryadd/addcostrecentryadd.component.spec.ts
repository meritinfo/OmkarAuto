import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcostrecentryaddComponent } from './addcostrecentryadd.component';

describe('AddcostrecentryaddComponent', () => {
  let component: AddcostrecentryaddComponent;
  let fixture: ComponentFixture<AddcostrecentryaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcostrecentryaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcostrecentryaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
