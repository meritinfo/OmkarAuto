import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlrbillseriesComponent } from './addlrbillseries.component';

describe('AddlrbillseriesComponent', () => {
  let component: AddlrbillseriesComponent;
  let fixture: ComponentFixture<AddlrbillseriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddlrbillseriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddlrbillseriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
