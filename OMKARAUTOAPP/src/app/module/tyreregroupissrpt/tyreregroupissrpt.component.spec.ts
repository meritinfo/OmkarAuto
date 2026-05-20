import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyreregroupissrptComponent } from './tyreregroupissrpt.component';

describe('TyreregroupissrptComponent', () => {
  let component: TyreregroupissrptComponent;
  let fixture: ComponentFixture<TyreregroupissrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyreregroupissrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyreregroupissrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
