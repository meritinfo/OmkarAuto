import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenbanklistComponent } from './benbanklist.component';

describe('BenbanklistComponent', () => {
  let component: BenbanklistComponent;
  let fixture: ComponentFixture<BenbanklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenbanklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenbanklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
