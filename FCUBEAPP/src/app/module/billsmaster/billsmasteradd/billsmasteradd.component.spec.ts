import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsmasteraddComponent } from './billsmasteradd.component';

describe('BillsmasteraddComponent', () => {
  let component: BillsmasteraddComponent;
  let fixture: ComponentFixture<BillsmasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsmasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
