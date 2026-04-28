import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillprintgsrComponent } from './billprintgsr.component';

describe('BillprintgsrComponent', () => {
  let component: BillprintgsrComponent;
  let fixture: ComponentFixture<BillprintgsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillprintgsrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillprintgsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
