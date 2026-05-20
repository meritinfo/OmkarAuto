import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleledgerreportComponent } from './multipleledgerreport.component';

describe('MultipleledgerreportComponent', () => {
  let component: MultipleledgerreportComponent;
  let fixture: ComponentFixture<MultipleledgerreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleledgerreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleledgerreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
