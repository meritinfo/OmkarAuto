import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistancemastertriplistComponent } from './distancemastertriplist.component';

describe('DistancemastertriplistComponent', () => {
  let component: DistancemastertriplistComponent;
  let fixture: ComponentFixture<DistancemastertriplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistancemastertriplistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistancemastertriplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
