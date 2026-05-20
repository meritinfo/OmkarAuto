import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsmasterlistComponent } from './billsmasterlist.component';

describe('BillsmasterlistComponent', () => {
  let component: BillsmasterlistComponent;
  let fixture: ComponentFixture<BillsmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
