import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsheetlistComponent } from './tripsheetlist.component';

describe('TripsheetlistComponent', () => {
  let component: TripsheetlistComponent;
  let fixture: ComponentFixture<TripsheetlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripsheetlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripsheetlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
