import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtrippaymentsComponent } from './addtrippayments.component';

describe('AddtrippaymentsComponent', () => {
  let component: AddtrippaymentsComponent;
  let fixture: ComponentFixture<AddtrippaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtrippaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtrippaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
