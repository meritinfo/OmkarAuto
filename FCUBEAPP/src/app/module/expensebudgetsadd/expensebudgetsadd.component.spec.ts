import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensebudgetsaddComponent } from './expensebudgetsadd.component';

describe('ExpensebudgetsaddComponent', () => {
  let component: ExpensebudgetsaddComponent;
  let fixture: ComponentFixture<ExpensebudgetsaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensebudgetsaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensebudgetsaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
