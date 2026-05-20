import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExptruckarrivalreportComponent } from './exptruckarrivalreport.component';

describe('ExptruckarrivalreportComponent', () => {
  let component: ExptruckarrivalreportComponent;
  let fixture: ComponentFixture<ExptruckarrivalreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExptruckarrivalreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExptruckarrivalreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
