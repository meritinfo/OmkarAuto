import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstregisterrptComponent } from './gstregisterrpt.component';

describe('GstregisterrptComponent', () => {
  let component: GstregisterrptComponent;
  let fixture: ComponentFixture<GstregisterrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstregisterrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstregisterrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
