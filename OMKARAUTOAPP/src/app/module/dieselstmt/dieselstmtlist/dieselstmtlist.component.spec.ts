import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselstmtlistComponent } from './dieselstmtlist.component';

describe('DieselstmtlistComponent', () => {
  let component: DieselstmtlistComponent;
  let fixture: ComponentFixture<DieselstmtlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DieselstmtlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DieselstmtlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
