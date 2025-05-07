import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrippaymentsllpaddComponent } from './trippaymentsllpadd.component';

describe('TrippaymentsllpaddComponent', () => {
  let component: TrippaymentsllpaddComponent;
  let fixture: ComponentFixture<TrippaymentsllpaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrippaymentsllpaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrippaymentsllpaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
