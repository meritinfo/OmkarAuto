import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyredeativateaddComponent } from './tyredeativateadd.component';

describe('TyredeativateaddComponent', () => {
  let component: TyredeativateaddComponent;
  let fixture: ComponentFixture<TyredeativateaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyredeativateaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyredeativateaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
