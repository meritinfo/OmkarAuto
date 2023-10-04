import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillstatementaddComponent } from './billstatementadd.component';

describe('BillstatementaddComponent', () => {
  let component: BillstatementaddComponent;
  let fixture: ComponentFixture<BillstatementaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillstatementaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillstatementaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
