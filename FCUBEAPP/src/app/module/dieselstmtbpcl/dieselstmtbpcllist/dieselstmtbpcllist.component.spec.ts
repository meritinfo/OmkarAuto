import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselstmtbpcllistComponent } from './dieselstmtbpcllist.component';

describe('DieselstmtbpcllistComponent', () => {
  let component: DieselstmtbpcllistComponent;
  let fixture: ComponentFixture<DieselstmtbpcllistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DieselstmtbpcllistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DieselstmtbpcllistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
