import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerrptComponent } from './ledgerrpt.component';

describe('LedgerrptComponent', () => {
  let component: LedgerrptComponent;
  let fixture: ComponentFixture<LedgerrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LedgerrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LedgerrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
