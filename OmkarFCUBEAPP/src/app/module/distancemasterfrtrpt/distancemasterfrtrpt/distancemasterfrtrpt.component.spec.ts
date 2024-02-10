import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistancemasterfrtrptComponent } from './distancemasterfrtrpt.component';

describe('DistancemasterfrtrptComponent', () => {
  let component: DistancemasterfrtrptComponent;
  let fixture: ComponentFixture<DistancemasterfrtrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistancemasterfrtrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistancemasterfrtrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
