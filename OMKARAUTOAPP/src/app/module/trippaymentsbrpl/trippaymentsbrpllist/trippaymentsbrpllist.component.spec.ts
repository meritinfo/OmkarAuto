import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrippaymentsbrpllistComponent } from './trippaymentsbrpllist.component';

describe('TrippaymentsbrpllistComponent', () => {
  let component: TrippaymentsbrpllistComponent;
  let fixture: ComponentFixture<TrippaymentsbrpllistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrippaymentsbrpllistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrippaymentsbrpllistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
