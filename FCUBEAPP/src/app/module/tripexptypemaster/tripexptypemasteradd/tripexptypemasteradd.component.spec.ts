import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripexptypemasteraddComponent } from './tripexptypemasteradd.component';

describe('TripexptypemasteraddComponent', () => {
  let component: TripexptypemasteraddComponent;
  let fixture: ComponentFixture<TripexptypemasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripexptypemasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripexptypemasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
