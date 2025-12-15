import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselstmtbpcladdComponent } from './dieselstmtbpcladd.component';

describe('DieselstmtbpcladdComponent', () => {
  let component: DieselstmtbpcladdComponent;
  let fixture: ComponentFixture<DieselstmtbpcladdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DieselstmtbpcladdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DieselstmtbpcladdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
