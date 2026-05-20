import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyreativatelistComponent } from './tyreativatelist.component';

describe('TyreativatelistComponent', () => {
  let component: TyreativatelistComponent;
  let fixture: ComponentFixture<TyreativatelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyreativatelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyreativatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
