import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GodownstockentryComponent } from './godownstockentry.component';

describe('GodownstockentryComponent', () => {
  let component: GodownstockentryComponent;
  let fixture: ComponentFixture<GodownstockentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GodownstockentryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GodownstockentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
