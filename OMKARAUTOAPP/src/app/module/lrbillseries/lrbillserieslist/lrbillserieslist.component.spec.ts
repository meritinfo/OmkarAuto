import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LrbillserieslistComponent } from './lrbillserieslist.component';

describe('LrbillserieslistComponent', () => {
  let component: LrbillserieslistComponent;
  let fixture: ComponentFixture<LrbillserieslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LrbillserieslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LrbillserieslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
