import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyreregroupissueaddComponent } from './tyreregroupissueadd.component';

describe('TyreregroupissueaddComponent', () => {
  let component: TyreregroupissueaddComponent;
  let fixture: ComponentFixture<TyreregroupissueaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyreregroupissueaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyreregroupissueaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
