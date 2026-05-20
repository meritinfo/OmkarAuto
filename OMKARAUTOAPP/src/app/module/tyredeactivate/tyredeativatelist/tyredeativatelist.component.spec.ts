import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyredeativatelistComponent } from './tyredeativatelist.component';

describe('TyredeativatelistComponent', () => {
  let component: TyredeativatelistComponent;
  let fixture: ComponentFixture<TyredeativatelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyredeativatelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyredeativatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
