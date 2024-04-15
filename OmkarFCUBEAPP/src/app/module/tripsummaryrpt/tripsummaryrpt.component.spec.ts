import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsummaryrptComponent } from './tripsummaryrpt.component';

describe('TripsummaryrptComponent', () => {
  let component: TripsummaryrptComponent;
  let fixture: ComponentFixture<TripsummaryrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripsummaryrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripsummaryrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
