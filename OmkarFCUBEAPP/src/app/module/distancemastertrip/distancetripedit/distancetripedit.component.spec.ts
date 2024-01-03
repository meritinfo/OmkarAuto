import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistancetripeditComponent } from './distancetripedit.component';

describe('DistancetripeditComponent', () => {
  let component: DistancetripeditComponent;
  let fixture: ComponentFixture<DistancetripeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistancetripeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistancetripeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
