import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingregisterComponent } from './bookingregister.component';

describe('BookingregisterComponent', () => {
  let component: BookingregisterComponent;
  let fixture: ComponentFixture<BookingregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingregisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
