import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistancemastertripaddComponent } from './distancemastertripadd.component';

describe('DistancemastertripaddComponent', () => {
  let component: DistancemastertripaddComponent;
  let fixture: ComponentFixture<DistancemastertripaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistancemastertripaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistancemastertripaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
