import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyrepurchaserptComponent } from './tyrepurchaserpt.component';

describe('TyrepurchaserptComponent', () => {
  let component: TyrepurchaserptComponent;
  let fixture: ComponentFixture<TyrepurchaserptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyrepurchaserptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyrepurchaserptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
