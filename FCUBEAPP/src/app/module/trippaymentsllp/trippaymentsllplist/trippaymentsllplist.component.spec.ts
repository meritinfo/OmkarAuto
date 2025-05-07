import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrippaymentsllplistComponent } from './trippaymentsllplist.component';

describe('TrippaymentsllplistComponent', () => {
  let component: TrippaymentsllplistComponent;
  let fixture: ComponentFixture<TrippaymentsllplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrippaymentsllplistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrippaymentsllplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
