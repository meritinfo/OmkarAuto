import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyreactivatedrptComponent } from './tyreactivatedrpt.component';

describe('TyreactivatedrptComponent', () => {
  let component: TyreactivatedrptComponent;
  let fixture: ComponentFixture<TyreactivatedrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyreactivatedrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyreactivatedrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
