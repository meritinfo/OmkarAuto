import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistancemasterfreightaddComponent } from './distancemasterfreightadd.component';

describe('DistancemasterfreightaddComponent', () => {
  let component: DistancemasterfreightaddComponent;
  let fixture: ComponentFixture<DistancemasterfreightaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistancemasterfreightaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistancemasterfreightaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
