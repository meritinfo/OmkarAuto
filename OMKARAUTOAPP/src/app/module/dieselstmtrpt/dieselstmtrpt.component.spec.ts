import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselstmtrptComponent } from './dieselstmtrpt.component';

describe('DieselstmtrptComponent', () => {
  let component: DieselstmtrptComponent;
  let fixture: ComponentFixture<DieselstmtrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DieselstmtrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DieselstmtrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
