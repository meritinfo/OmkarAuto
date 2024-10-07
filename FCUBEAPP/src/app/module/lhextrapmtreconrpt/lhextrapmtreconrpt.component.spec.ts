import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhextrapmtreconrptComponent } from './lhextrapmtreconrpt.component';

describe('LhextrapmtreconrptComponent', () => {
  let component: LhextrapmtreconrptComponent;
  let fixture: ComponentFixture<LhextrapmtreconrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhextrapmtreconrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LhextrapmtreconrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
