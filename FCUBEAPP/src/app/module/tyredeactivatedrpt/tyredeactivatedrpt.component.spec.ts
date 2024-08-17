import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyredeactivatedrptComponent } from './tyredeactivatedrpt.component';

describe('TyredeactivatedrptComponent', () => {
  let component: TyredeactivatedrptComponent;
  let fixture: ComponentFixture<TyredeactivatedrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyredeactivatedrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyredeactivatedrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
