import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselstatementrptComponent } from './dieselstatementrpt.component';

describe('DieselstatementrptComponent', () => {
  let component: DieselstatementrptComponent;
  let fixture: ComponentFixture<DieselstatementrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DieselstatementrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DieselstatementrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
