import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistancemastertriprptComponent } from './distancemastertriprpt.component';

describe('DistancemastertriprptComponent', () => {
  let component: DistancemastertriprptComponent;
  let fixture: ComponentFixture<DistancemastertriprptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistancemastertriprptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistancemastertriprptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
