import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrippaymentslistComponent } from './trippaymentslist.component';

describe('TrippaymentslistComponent', () => {
  let component: TrippaymentslistComponent;
  let fixture: ComponentFixture<TrippaymentslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrippaymentslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrippaymentslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
