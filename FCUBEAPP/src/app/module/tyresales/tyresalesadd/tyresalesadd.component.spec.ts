import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyresalesaddComponent } from './tyresalesadd.component';

describe('TyresalesaddComponent', () => {
  let component: TyresalesaddComponent;
  let fixture: ComponentFixture<TyresalesaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyresalesaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyresalesaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
