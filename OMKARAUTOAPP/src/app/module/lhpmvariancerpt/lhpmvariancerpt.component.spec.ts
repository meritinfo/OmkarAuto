import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhpmvariancerptComponent } from './lhpmvariancerpt.component';

describe('LhpmvariancerptComponent', () => {
  let component: LhpmvariancerptComponent;
  let fixture: ComponentFixture<LhpmvariancerptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhpmvariancerptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LhpmvariancerptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
