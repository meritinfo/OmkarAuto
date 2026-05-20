import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillprintllpComponent } from './billprintllp.component';

describe('BillprintllpComponent', () => {
  let component: BillprintllpComponent;
  let fixture: ComponentFixture<BillprintllpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillprintllpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillprintllpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
