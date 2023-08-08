import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsheetaddComponent } from './tripsheetadd.component';

describe('TripsheetaddComponent', () => {
  let component: TripsheetaddComponent;
  let fixture: ComponentFixture<TripsheetaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripsheetaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripsheetaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
