import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsmasteraddllpComponent } from './billsmasteraddllp.component';

describe('BillsmasteraddllpComponent', () => {
  let component: BillsmasteraddllpComponent;
  let fixture: ComponentFixture<BillsmasteraddllpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsmasteraddllpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsmasteraddllpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
