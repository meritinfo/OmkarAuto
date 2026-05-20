import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyrepurchasemasteraddComponent } from './tyrepurchasemasteradd.component';

describe('TyrepurchasemasteraddComponent', () => {
  let component: TyrepurchasemasteraddComponent;
  let fixture: ComponentFixture<TyrepurchasemasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyrepurchasemasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyrepurchasemasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
