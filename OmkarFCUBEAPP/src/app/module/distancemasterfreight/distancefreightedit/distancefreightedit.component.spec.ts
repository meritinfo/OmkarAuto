import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistancefreighteditComponent } from './distancefreightedit.component';

describe('DistancefreighteditComponent', () => {
  let component: DistancefreighteditComponent;
  let fixture: ComponentFixture<DistancefreighteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistancefreighteditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistancefreighteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
