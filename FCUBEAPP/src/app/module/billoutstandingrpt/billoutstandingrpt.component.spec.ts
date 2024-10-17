import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilloutstandingrptComponent } from './billoutstandingrpt.component';

describe('BilloutstandingrptComponent', () => {
  let component: BilloutstandingrptComponent;
  let fixture: ComponentFixture<BilloutstandingrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilloutstandingrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilloutstandingrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
