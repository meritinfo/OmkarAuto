import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LrrealisationstatusrptComponent } from './lrrealisationstatusrpt.component';

describe('LrrealisationstatusrptComponent', () => {
  let component: LrrealisationstatusrptComponent;
  let fixture: ComponentFixture<LrrealisationstatusrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LrrealisationstatusrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LrrealisationstatusrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
