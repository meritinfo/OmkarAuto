import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyreregrouprecdaddComponent } from './tyreregrouprecdadd.component';

describe('TyreregrouprecdaddComponent', () => {
  let component: TyreregrouprecdaddComponent;
  let fixture: ComponentFixture<TyreregrouprecdaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyreregrouprecdaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyreregrouprecdaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
