import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandinganalysisrptComponent } from './outstandinganalysisrpt.component';

describe('OutstandinganalysisrptComponent', () => {
  let component: OutstandinganalysisrptComponent;
  let fixture: ComponentFixture<OutstandinganalysisrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutstandinganalysisrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutstandinganalysisrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
