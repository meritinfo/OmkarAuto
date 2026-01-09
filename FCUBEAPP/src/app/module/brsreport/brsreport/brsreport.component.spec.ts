import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrsreportComponent } from './brsreport.component';

describe('BrsreportComponent', () => {
  let component: BrsreportComponent;
  let fixture: ComponentFixture<BrsreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrsreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
