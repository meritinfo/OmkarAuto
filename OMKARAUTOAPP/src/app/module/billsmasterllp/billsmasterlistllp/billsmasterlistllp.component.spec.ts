import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsmasterlistllpComponent } from './billsmasterlistllp.component';

describe('BillsmasterlistllpComponent', () => {
  let component: BillsmasterlistllpComponent;
  let fixture: ComponentFixture<BillsmasterlistllpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsmasterlistllpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsmasterlistllpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
