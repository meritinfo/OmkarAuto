import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyrepositionmasterlistComponent } from './tyrepositionmasterlist.component';

describe('TyrepositionmasterlistComponent', () => {
  let component: TyrepositionmasterlistComponent;
  let fixture: ComponentFixture<TyrepositionmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyrepositionmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyrepositionmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
