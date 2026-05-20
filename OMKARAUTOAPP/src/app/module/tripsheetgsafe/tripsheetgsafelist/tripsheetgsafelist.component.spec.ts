import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsheetgsafelistComponent } from './tripsheetgsafelist.component';

describe('TripsheetgsafelistComponent', () => {
  let component: TripsheetgsafelistComponent;
  let fixture: ComponentFixture<TripsheetgsafelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripsheetgsafelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripsheetgsafelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
