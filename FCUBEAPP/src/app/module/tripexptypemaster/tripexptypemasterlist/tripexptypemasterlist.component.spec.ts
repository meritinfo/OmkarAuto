import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripexptypemasterlistComponent } from './tripexptypemasterlist.component';

describe('TripexptypemasterlistComponent', () => {
  let component: TripexptypemasterlistComponent;
  let fixture: ComponentFixture<TripexptypemasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripexptypemasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripexptypemasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
