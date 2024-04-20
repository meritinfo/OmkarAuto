import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrippaymentsrptComponent } from './trippaymentsrpt.component';

describe('TrippaymentsrptComponent', () => {
  let component: TrippaymentsrptComponent;
  let fixture: ComponentFixture<TrippaymentsrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrippaymentsrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrippaymentsrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
