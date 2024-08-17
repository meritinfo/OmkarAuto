import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyrehistoryrptComponent } from './tyrehistoryrpt.component';

describe('TyrehistoryrptComponent', () => {
  let component: TyrehistoryrptComponent;
  let fixture: ComponentFixture<TyrehistoryrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyrehistoryrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyrehistoryrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
