import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyreregrouprecdlistComponent } from './tyreregrouprecdlist.component';

describe('TyreregrouprecdlistComponent', () => {
  let component: TyreregrouprecdlistComponent;
  let fixture: ComponentFixture<TyreregrouprecdlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyreregrouprecdlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyreregrouprecdlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
