import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhpmslabmasteraddComponent } from './lhpmslabmasteradd.component';

describe('LhpmslabmasteraddComponent', () => {
  let component: LhpmslabmasteraddComponent;
  let fixture: ComponentFixture<LhpmslabmasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhpmslabmasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LhpmslabmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
