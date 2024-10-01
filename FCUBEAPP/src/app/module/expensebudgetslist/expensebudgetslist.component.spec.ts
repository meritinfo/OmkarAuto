import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensebudgetslistComponent } from './expensebudgetslist.component';

describe('ExpensebudgetslistComponent', () => {
  let component: ExpensebudgetslistComponent;
  let fixture: ComponentFixture<ExpensebudgetslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensebudgetslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensebudgetslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
