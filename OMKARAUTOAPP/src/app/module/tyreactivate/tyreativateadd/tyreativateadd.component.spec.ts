import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyreativateaddComponent } from './tyreativateadd.component';

describe('TyreativateaddComponent', () => {
  let component: TyreativateaddComponent;
  let fixture: ComponentFixture<TyreativateaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyreativateaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyreativateaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
