import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripoutstandingrptComponent } from './tripoutstandingrpt.component';

describe('TripoutstandingrptComponent', () => {
  let component: TripoutstandingrptComponent;
  let fixture: ComponentFixture<TripoutstandingrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripoutstandingrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripoutstandingrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
