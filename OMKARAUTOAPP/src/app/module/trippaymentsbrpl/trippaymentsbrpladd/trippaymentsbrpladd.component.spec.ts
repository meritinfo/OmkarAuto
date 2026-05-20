import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrippaymentsbrpladdComponent } from './trippaymentsbrpladd.component';

describe('TrippaymentsbrpladdComponent', () => {
  let component: TrippaymentsbrpladdComponent;
  let fixture: ComponentFixture<TrippaymentsbrpladdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrippaymentsbrpladdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrippaymentsbrpladdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
