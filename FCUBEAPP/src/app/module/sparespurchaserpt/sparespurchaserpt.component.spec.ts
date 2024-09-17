import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparespurchaserptComponent } from './sparespurchaserpt.component';

describe('SparespurchaserptComponent', () => {
  let component: SparespurchaserptComponent;
  let fixture: ComponentFixture<SparespurchaserptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparespurchaserptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SparespurchaserptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
