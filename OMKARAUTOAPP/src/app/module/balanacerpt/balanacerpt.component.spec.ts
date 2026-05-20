import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanacerptComponent } from './balanacerpt.component';

describe('BalanacerptComponent', () => {
  let component: BalanacerptComponent;
  let fixture: ComponentFixture<BalanacerptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanacerptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanacerptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
