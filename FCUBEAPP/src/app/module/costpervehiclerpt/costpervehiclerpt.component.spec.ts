import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostpervehiclerptComponent } from './costpervehiclerpt.component';

describe('CostpervehiclerptComponent', () => {
  let component: CostpervehiclerptComponent;
  let fixture: ComponentFixture<CostpervehiclerptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostpervehiclerptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostpervehiclerptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
