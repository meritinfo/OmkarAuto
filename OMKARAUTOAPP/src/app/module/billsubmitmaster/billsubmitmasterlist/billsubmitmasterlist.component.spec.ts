import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsubmitmasterlistComponent } from './billsubmitmasterlist.component';

describe('BillsubmitmasterlistComponent', () => {
  let component: BillsubmitmasterlistComponent;
  let fixture: ComponentFixture<BillsubmitmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsubmitmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsubmitmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
