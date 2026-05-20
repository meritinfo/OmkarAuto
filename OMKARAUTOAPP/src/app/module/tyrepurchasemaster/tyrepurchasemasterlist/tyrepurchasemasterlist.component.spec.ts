import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyrepurchasemasterlistComponent } from './tyrepurchasemasterlist.component';

describe('TyrepurchasemasterlistComponent', () => {
  let component: TyrepurchasemasterlistComponent;
  let fixture: ComponentFixture<TyrepurchasemasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyrepurchasemasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyrepurchasemasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
