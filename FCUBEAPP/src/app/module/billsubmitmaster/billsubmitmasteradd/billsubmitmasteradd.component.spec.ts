import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsubmitmasteraddComponent } from './billsubmitmasteradd.component';

describe('BillsubmitmasteraddComponent', () => {
  let component: BillsubmitmasteraddComponent;
  let fixture: ComponentFixture<BillsubmitmasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsubmitmasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsubmitmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
