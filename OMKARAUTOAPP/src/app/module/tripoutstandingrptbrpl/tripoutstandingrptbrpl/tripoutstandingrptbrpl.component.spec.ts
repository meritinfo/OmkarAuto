import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripoutstandingrptbrplComponent } from './tripoutstandingrptbrpl.component';

describe('TripoutstandingrptbrplComponent', () => {
  let component: TripoutstandingrptbrplComponent;
  let fixture: ComponentFixture<TripoutstandingrptbrplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripoutstandingrptbrplComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripoutstandingrptbrplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
