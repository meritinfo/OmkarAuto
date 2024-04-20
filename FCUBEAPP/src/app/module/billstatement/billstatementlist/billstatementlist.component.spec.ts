import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillstatementlistComponent } from './billstatementlist.component';

describe('BillstatementlistComponent', () => {
  let component: BillstatementlistComponent;
  let fixture: ComponentFixture<BillstatementlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillstatementlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillstatementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
