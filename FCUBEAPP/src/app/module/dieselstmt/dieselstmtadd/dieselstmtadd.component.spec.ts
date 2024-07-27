import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselstmtaddComponent } from './dieselstmtadd.component';

describe('DieselstmtaddComponent', () => {
  let component: DieselstmtaddComponent;
  let fixture: ComponentFixture<DieselstmtaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DieselstmtaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DieselstmtaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
