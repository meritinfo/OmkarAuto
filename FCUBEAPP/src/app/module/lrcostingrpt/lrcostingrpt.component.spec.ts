import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LrcostingrptComponent } from './lrcostingrpt.component';

describe('LrcostingrptComponent', () => {
  let component: LrcostingrptComponent;
  let fixture: ComponentFixture<LrcostingrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LrcostingrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LrcostingrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
