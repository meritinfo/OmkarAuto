import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstpctvalueslistComponent } from './gstpctvalueslist.component';

describe('GstpctvalueslistComponent', () => {
  let component: GstpctvalueslistComponent;
  let fixture: ComponentFixture<GstpctvalueslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstpctvalueslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstpctvalueslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
