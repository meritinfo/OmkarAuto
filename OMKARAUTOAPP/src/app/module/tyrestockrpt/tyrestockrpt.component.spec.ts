import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyrestockrptComponent } from './tyrestockrpt.component';

describe('TyrestockrptComponent', () => {
  let component: TyrestockrptComponent;
  let fixture: ComponentFixture<TyrestockrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyrestockrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyrestockrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
