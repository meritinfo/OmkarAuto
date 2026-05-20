import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstpctvaluesaddComponent } from './gstpctvaluesadd.component';

describe('GstpctvaluesaddComponent', () => {
  let component: GstpctvaluesaddComponent;
  let fixture: ComponentFixture<GstpctvaluesaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstpctvaluesaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstpctvaluesaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
