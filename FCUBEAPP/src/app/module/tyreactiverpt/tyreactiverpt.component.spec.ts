import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyreactiverptComponent } from './tyreactiverpt.component';

describe('TyreactiverptComponent', () => {
  let component: TyreactiverptComponent;
  let fixture: ComponentFixture<TyreactiverptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyreactiverptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyreactiverptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
